package com.trustverse.repository;

import com.trustverse.model.Verification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VerificationRepository extends MongoRepository<Verification, String> {
    List<Verification> findByCredentialId(String credentialId);
    List<Verification> findByProofRequestId(String proofRequestId);
}
