package com.trustverse.controller;

import com.trustverse.model.Credential;
import com.trustverse.security.UserPrincipal;
import com.trustverse.service.CredentialService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/credentials")
@RequiredArgsConstructor
public class CredentialController {

    private final CredentialService credentialService;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class IssueCredentialRequest {
        private String schemaId;
        private String holderId;
        private String holderDid;
        private String domain;
        private Map<String, String> claims;
        private String documentFileName;
        // Issuer stamp — used when no JWT principal is present (demo mode)
        private String issuerDid;
        private String issuerName;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RevokeCredentialRequest {
        private String reason;
    }

    @PostMapping("/issue")
    public ResponseEntity<Credential> issueCredential(
            @RequestBody IssueCredentialRequest req,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        String issuerId   = userPrincipal != null ? userPrincipal.getId()  : ("demo_" + (req.getIssuerName() != null ? req.getIssuerName().replaceAll("\\s+", "_").toLowerCase() : "issuer"));
        String issuerDid  = userPrincipal != null ? userPrincipal.getDid() : (req.getIssuerDid() != null ? req.getIssuerDid() : "did:trustverse:org:pccoer");

        Credential credential = credentialService.issueCredential(
                req.getSchemaId(),
                issuerId,
                req.getHolderId() != null ? req.getHolderId() : "demo_holder_id",
                issuerDid,
                req.getHolderDid() != null ? req.getHolderDid() : "did:trustverse:holder:riyasharma",
                req.getDomain() != null ? req.getDomain() : "education",
                req.getClaims(),
                req.getDocumentFileName()
        );

        return ResponseEntity.ok(credential);
    }

    @GetMapping
    public ResponseEntity<List<Credential>> getCredentials(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(required = false) String role
    ) {
        if (userPrincipal == null) {
            return ResponseEntity.ok(credentialService.getAllCredentials());
        }

        if ("ISSUER".equalsIgnoreCase(userPrincipal.getRole()) || "ROLE_ISSUER".equalsIgnoreCase(userPrincipal.getRole())) {
            return ResponseEntity.ok(credentialService.getCredentialsByIssuer(userPrincipal.getId()));
        } else {
            return ResponseEntity.ok(credentialService.getCredentialsByHolder(userPrincipal.getId()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Credential> getCredentialById(@PathVariable String id) {
        return credentialService.getCredentialById(id)
                .or(() -> credentialService.getCredentialByCredentialId(id))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/revoke")
    public ResponseEntity<Credential> revokeCredential(
            @PathVariable String id,
            @RequestBody(required = false) RevokeCredentialRequest req
    ) {
        String reason = req != null && req.getReason() != null ? req.getReason() : "Issuer decision - Administrative revocation";
        Credential revoked = credentialService.revokeCredential(id, reason);
        return ResponseEntity.ok(revoked);
    }
}
