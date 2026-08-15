package com.trustverse.repository;

import com.trustverse.model.ProofRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProofRequestRepository extends MongoRepository<ProofRequest, String> {
    Optional<ProofRequest> findByNonce(String nonce);
    List<ProofRequest> findByVerifierId(String verifierId);
    List<ProofRequest> findByCredentialId(String credentialId);
}
