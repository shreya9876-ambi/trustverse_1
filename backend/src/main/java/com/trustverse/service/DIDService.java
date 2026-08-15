package com.trustverse.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DIDService {

    public String generateUserDid(String role, String identifier) {
        String prefix = role != null ? role.toLowerCase() : "user";
        String cleanId = identifier != null ? identifier.toLowerCase().replaceAll("[^a-z0-9]", "") : UUID.randomUUID().toString().substring(0, 8);
        return "did:trustverse:" + prefix + ":" + cleanId;
    }

    public String generateOrgDid(String orgName) {
        String cleanName = orgName != null ? orgName.toLowerCase().replaceAll("[^a-z0-9]", "") : "org";
        return "did:trustverse:org:" + cleanName;
    }
}
