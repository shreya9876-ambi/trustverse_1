package com.trustverse.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "credentials")
public class Credential {

    @Id
    private String id;

    private String credentialId;
    private String schemaId;
    private String issuerId;
    private String holderId;
    private String domain; // education, employment, healthcare, government

    private Map<String, String> claims;
    private List<ClaimCommitment> claimCommitments;
    private String merkleRoot;
    private String issuerDid;
    private String holderDid;

    private String blockchainTxHash;
    private String contractAddress;

    private String status; // ACTIVE, REVOKED, EXPIRED
    private double trustScore;
    private double forensicScore;
    private double fraudScore;

    private String ecdsaSignature;
    private String pqcSignature; // Dilithium/ML-DSA signature reference

    private Instant issuedAt;
    private Instant expiresAt;
    private Instant revokedAt;
    private String revocationReason;
}
