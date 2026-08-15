package com.trustverse.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "proof_requests")
public class ProofRequest {

    @Id
    private String id;

    private String credentialId;
    private String verifierId;
    private String requestedClaim; // e.g. "cgpa >= 7.5"
    private String nonce; // Cryptographically secure 256-bit one-time nonce
    private String status; // PENDING, FULFILLED, EXPIRED
    private boolean used;

    @CreatedDate
    private Instant createdAt;
    private Instant expiresAt;
}
