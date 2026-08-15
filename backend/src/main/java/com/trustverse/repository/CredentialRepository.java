package com.trustverse.repository;

import com.trustverse.model.Credential;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CredentialRepository extends MongoRepository<Credential, String> {
    Optional<Credential> findByCredentialId(String credentialId);
    List<Credential> findByHolderId(String holderId);
    List<Credential> findByIssuerId(String issuerId);
    List<Credential> findByDomain(String domain);
    List<Credential> findByStatus(String status);
}
