package com.trustverse.controller;

import com.trustverse.model.ProofRequest;
import com.trustverse.repository.ProofRequestRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/verify")
@RequiredArgsConstructor
public class VerificationController {

    private final ProofRequestRepository proofRequestRepository;

    @GetMapping("/{sessionId}")
    public ResponseEntity<Map<String, Object>> getVerificationSession(@PathVariable String sessionId) {
        return proofRequestRepository.findById(sessionId)
                .or(() -> proofRequestRepository.findByNonce(sessionId))
                .map(req -> ResponseEntity.ok(Map.<String, Object>of(
                        "sessionId", req.getId(),
                        "credentialId", req.getCredentialId(),
                        "requestedClaim", req.getRequestedClaim(),
                        "nonce", req.getNonce(),
                        "status", req.getStatus(),
                        "used", req.isUsed(),
                        "expiresAt", req.getExpiresAt()
                )))
                .orElse(ResponseEntity.notFound().build());
    }
}
