package com.trustverse.controller;

import com.trustverse.model.ProofRequest;
import com.trustverse.security.UserPrincipal;
import com.trustverse.service.ProofService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/proofs")
@RequiredArgsConstructor
public class ProofController {

    private final ProofService proofService;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateProofRequestDto {
        private String credentialId;
        private String requestedClaim;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GenerateZkProofDto {
        private String proofRequestId;
        private String holderDid;
        private Map<String, Boolean> selectedClaims;
    }

    @PostMapping("/request")
    public ResponseEntity<ProofRequest> createProofRequest(
            @RequestBody CreateProofRequestDto req,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        String verifierId = userPrincipal != null ? userPrincipal.getId() : "demo_verifier_id";
        ProofRequest proofRequest = proofService.createProofRequest(
                req.getCredentialId(),
                verifierId,
                req.getRequestedClaim() != null ? req.getRequestedClaim() : "cgpa >= 7.5"
        );
        return ResponseEntity.ok(proofRequest);
    }

    @PostMapping("/generate")
    public ResponseEntity<ProofService.ZkProofPayload> generateZkProof(
            @RequestBody GenerateZkProofDto req,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        String holderDid = req.getHolderDid() != null ? req.getHolderDid() :
                (userPrincipal != null ? userPrincipal.getDid() : "did:trustverse:holder:riyasharma");

        ProofService.ZkProofPayload payload = proofService.generateZkProof(
                req.getProofRequestId(),
                holderDid,
                req.getSelectedClaims()
        );
        return ResponseEntity.ok(payload);
    }

    @PostMapping("/verify")
    public ResponseEntity<ProofService.ProofVerificationResult> verifyZkProof(@RequestBody ProofService.ZkProofPayload payload) {
        ProofService.ProofVerificationResult result = proofService.verifyZkProof(payload);
        return ResponseEntity.ok(result);
    }
}
