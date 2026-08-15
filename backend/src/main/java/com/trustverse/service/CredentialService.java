package com.trustverse.service;

import com.trustverse.model.ClaimCommitment;
import com.trustverse.model.Credential;

import com.trustverse.repository.CredentialRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class CredentialService {

    private final CredentialRepository credentialRepository;
    private final MerkleService merkleService;
    private final HybridSignatureService hybridSignatureService;
    private final BlockchainService blockchainService;
    private final ForensicService forensicService;
    private final TrustScoreService trustScoreService;

    /**
     * Complete Master Issuance Pipeline:
     * Document Analysis -> Claim Extraction -> Federated Gate -> Salted Commitments -> Merkle Tree -> Hybrid Signatures -> Polygon Amoy Web3j Anchor
     */
    public Credential issueCredential(
            String schemaId,
            String issuerId,
            String holderId,
            String issuerDid,
            String holderDid,
            String domain,
            Map<String, String> claims,
            String documentFileName
    ) {
        log.info("Initiating Master Issuance Pipeline for Domain [{}] Issuer [{}] Holder [{}]", domain, issuerDid, holderDid);

        // Step 1: AI Forensic Analysis
        ForensicService.ForensicResult forensicResult = forensicService.analyzeDocument(
                documentFileName != null ? documentFileName : "credential_certificate.pdf",
                "application/pdf",
                102400L
        );

        if ("FAIL".equalsIgnoreCase(forensicResult.getStatus())) {
            throw new IllegalStateException("AI Forensic Analysis Failed. Document flagged for forgery: " + forensicResult.getExplanation());
        }

        // Step 2: Federated Trust/Fraud Gate
        TrustScoreService.TrustEvaluationResult trustResult = trustScoreService.evaluateIssuanceTrust(
                issuerDid,
                holderDid,
                domain,
                forensicResult.getForensicScore()
        );

        if ("REJECTED".equalsIgnoreCase(trustResult.getDecision())) {
            throw new IllegalStateException("Federated Trust Gate Rejected Issuance. Risk level: " + trustResult.getRiskLevel());
        }

        // Step 3: Salted Claim Commitments
        List<ClaimCommitment> commitments = merkleService.generateClaimCommitments(claims);

        // Step 4: Merkle Tree Construction & Merkle Root Calculation
        String merkleRoot = merkleService.computeMerkleRoot(commitments);

        // Step 5: Hybrid Cryptographic Signatures (ECDSA + PQC ML-DSA)
        String ecdsaSig = hybridSignatureService.generateEcdsaSignature(issuerDid, merkleRoot);
        String pqcSig = hybridSignatureService.generatePqcSignature(issuerDid, merkleRoot);

        // Step 6: Blockchain Smart Contract Anchoring via Web3j on Polygon Amoy
        String credentialId = "cred_" + UUID.randomUUID().toString().substring(0, 12);
        BlockchainService.BlockchainRecord anchorRecord = blockchainService.anchorCredentialOnChain(
                credentialId,
                merkleRoot,
                issuerDid,
                pqcSig
        );

        // Step 7: Create and save Credential object
        Credential credential = Credential.builder()
                .credentialId(credentialId)
                .schemaId(schemaId)
                .issuerId(issuerId)
                .holderId(holderId)
                .domain(domain)
                .claims(claims)
                .claimCommitments(commitments)
                .merkleRoot(merkleRoot)
                .issuerDid(issuerDid)
                .holderDid(holderDid)
                .blockchainTxHash(anchorRecord.txHash())
                .contractAddress(blockchainService.getContractAddress())
                .status("ACTIVE")
                .trustScore(trustResult.getOverallTrustScore())
                .forensicScore(forensicResult.getForensicScore())
                .fraudScore(trustResult.getFraudScore())
                .ecdsaSignature(ecdsaSig)
                .pqcSignature(pqcSig)
                .issuedAt(Instant.now())
                .build();

        Credential saved = credentialRepository.save(credential);
        log.info("Credential [{}] successfully anchored on Polygon Amoy. TxHash: [{}]", credentialId, saved.getBlockchainTxHash());

        return saved;
    }

    public List<Credential> getCredentialsByHolder(String holderId) {
        return credentialRepository.findByHolderId(holderId);
    }

    public List<Credential> getCredentialsByIssuer(String issuerId) {
        return credentialRepository.findByIssuerId(issuerId);
    }

    public Optional<Credential> getCredentialById(String id) {
        return credentialRepository.findById(id);
    }

    public Optional<Credential> getCredentialByCredentialId(String credentialId) {
        return credentialRepository.findByCredentialId(credentialId);
    }

    public List<Credential> getAllCredentials() {
        return credentialRepository.findAll();
    }

    /**
     * Revokes a credential on-chain via Web3j and updates database status.
     */
    public Credential revokeCredential(String credentialId, String reason) {
        Credential credential = credentialRepository.findByCredentialId(credentialId)
                .orElseThrow(() -> new IllegalArgumentException("Credential not found: " + credentialId));

        // Revoke on Polygon Amoy smart contract
        blockchainService.revokeCredentialOnChain(credentialId, reason);

        credential.setStatus("REVOKED");
        credential.setRevokedAt(Instant.now());
        credential.setRevocationReason(reason);

        return credentialRepository.save(credential);
    }
}
