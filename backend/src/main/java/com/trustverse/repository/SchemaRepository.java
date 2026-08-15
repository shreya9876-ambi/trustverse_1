package com.trustverse.repository;

import com.trustverse.model.CredentialSchema;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SchemaRepository extends MongoRepository<CredentialSchema, String> {
    List<CredentialSchema> findByDomain(String domain);
    List<CredentialSchema> findByOrganizationId(String organizationId);
}
