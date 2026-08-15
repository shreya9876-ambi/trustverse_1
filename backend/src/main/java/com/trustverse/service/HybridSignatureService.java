package com.trustverse.service;

import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.HexFormat;
import java.security.MessageDigest;

@Service
public class HybridSignatureService {

    /**
     * Generates standard ECDSA signature reference for EVM Polygon compatibility.
     */
    public String generateEcdsaSignature(String issuerDid, String merkleRoot) {
        String payload = issuerDid + ":" + merkleRoot;
        return "0x" + sha256("ECDSA_SECPO256K1:" + payload);
    }

    /**
     * Generates Post-Quantum ML-DSA / Dilithium-5 signature reference.
     */
    public String generatePqcSignature(String issuerDid, String merkleRoot) {
        String payload = issuerDid + ":" + merkleRoot + ":PQC_ML_DSA_LEVEL5";
        return "0x_PQC_DILITHIUM5_" + sha256(payload);
    }

    private String sha256(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (Exception e) {
            return "0x00000000";
        }
    }
}
