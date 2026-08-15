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
@Document(collection = "verifications")
public class Verification {

    @Id
    private String id;

    private String credentialId;
    private String proofRequestId;
    private String claim;
    private boolean result; // TRUE / FALSE
    private String issuerDid;
    private String holderDid;
    private String merkleRoot;
    private String blockchainTxHash;
    private String zkProofData;
    private String verifierNonce;

    @CreatedDate
    private Instant verifiedAt;
}
