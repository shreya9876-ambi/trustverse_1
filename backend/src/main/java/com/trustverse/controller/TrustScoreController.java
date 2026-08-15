package com.trustverse.controller;

import com.trustverse.service.TrustScoreService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TrustScoreController {

    private final TrustScoreService trustScoreService;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TrustScoreRequest {
        private String issuerDid;
        private String holderDid;
        private String domain;
        private double forensicScore;
    }

    @PostMapping("/trust-score")
    public ResponseEntity<TrustScoreService.TrustEvaluationResult> evaluateTrustScore(@RequestBody TrustScoreRequest req) {
        TrustScoreService.TrustEvaluationResult result = trustScoreService.evaluateIssuanceTrust(
                req.getIssuerDid() != null ? req.getIssuerDid() : "did:trustverse:org:pccoer",
                req.getHolderDid() != null ? req.getHolderDid() : "did:trustverse:holder:riyasharma",
                req.getDomain() != null ? req.getDomain() : "education",
                req.getForensicScore() > 0 ? req.getForensicScore() : 0.94
        );
        return ResponseEntity.ok(result);
    }

    @GetMapping("/fraud-alerts")
    public ResponseEntity<List<Map<String, Object>>> getFraudAlerts() {
        List<Map<String, Object>> alerts = List.of(
                Map.of(
                        "id", "alert_01",
                        "severity", "LOW",
                        "issuerDid", "did:trustverse:org:pccoer",
                        "message", "Normal issuance pattern detected across member graph nodes.",
                        "timestamp", "2026-08-15T18:00:00Z"
                ),
                Map.of(
                        "id", "alert_02",
                        "severity", "INFO",
                        "issuerDid", "did:trustverse:org:acme",
                        "message", "Federated model updated cross-institutional trust weight parameters.",
                        "timestamp", "2026-08-15T19:00:00Z"
                )
        );
        return ResponseEntity.ok(alerts);
    }
}
