package com.trustverse.service;

import com.trustverse.model.ClaimCommitment;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;

@Service
public class MerkleService {

    private final SecureRandom secureRandom = new SecureRandom();

    /**
     * Generates a 256-bit secure random salt in hex string format.
     */
    public String generateSalt() {
        byte[] salt = new byte[32];
        secureRandom.nextBytes(salt);
        return HexFormat.of().formatHex(salt);
    }

    /**
     * Calculates SHA-256 hash of (value || salt).
     */
    public String calculateSaltedCommitment(String key, String value, String salt) {
        String payload = key + ":" + value + ":" + salt;
        return sha256(payload);
    }

    /**
     * Builds list of salted claim commitments for a set of claim key-value pairs.
     */
    public List<ClaimCommitment> generateClaimCommitments(Map<String, String> claims) {
        List<ClaimCommitment> commitments = new ArrayList<>();
        for (Map.Entry<String, String> entry : claims.entrySet()) {
            String salt = generateSalt();
            String commitmentHash = calculateSaltedCommitment(entry.getKey(), entry.getValue(), salt);
            commitments.add(ClaimCommitment.builder()
                    .field(entry.getKey())
                    .commitment(commitmentHash)
                    .salt(salt)
                    .build());
        }
        return commitments;
    }

    /**
     * Constructs a Merkle Tree from claim commitments and returns 0x-prefixed 32-byte hex Merkle Root.
     */
    public String computeMerkleRoot(List<ClaimCommitment> commitments) {
        if (commitments == null || commitments.isEmpty()) {
            return "0x0000000000000000000000000000000000000000000000000000000000000000";
        }

        List<String> currentLevel = new ArrayList<>();
        for (ClaimCommitment c : commitments) {
            currentLevel.add(c.getCommitment());
        }

        while (currentLevel.size() > 1) {
            List<String> nextLevel = new ArrayList<>();
            for (int i = 0; i < currentLevel.size(); i += 2) {
                if (i + 1 < currentLevel.size()) {
                    String combined = currentLevel.get(i) + currentLevel.get(i + 1);
                    nextLevel.add(sha256(combined));
                } else {
                    // Duplicate last element for odd number of leaves
                    String combined = currentLevel.get(i) + currentLevel.get(i);
                    nextLevel.add(sha256(combined));
                }
            }
            currentLevel = nextLevel;
        }

        String rawRoot = currentLevel.get(0);
        return rawRoot.startsWith("0x") ? rawRoot : "0x" + rawRoot;
    }

    /**
     * Utility method to compute SHA-256 hex string.
     */
    public String sha256(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 digest algorithm unavailable", e);
        }
    }
}
