package com.trustverse.service;

import com.trustverse.model.CredentialSchema;
import com.trustverse.model.SchemaField;
import com.trustverse.repository.SchemaRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class SchemaService {

    private final SchemaRepository schemaRepository;

    @PostConstruct
    public void seedDefaultSchemas() {
        if (schemaRepository.count() == 0) {
            log.info("Seeding TrustVerse multi-domain schemas...");

            // 1. Education Schema (FULL DEMO)
            CredentialSchema eduSchema = CredentialSchema.builder()
                    .domain("education")
                    .name("Bachelor Degree")
                    .version("1.0")
                    .fields(List.of(
                            new SchemaField("studentName", "string", true, null, true),
                            new SchemaField("studentId", "string", true, null, false),
                            new SchemaField("degree", "string", true, null, true),
                            new SchemaField("branch", "string", true, null, true),
                            new SchemaField("institution", "string", true, null, true),
                            new SchemaField("cgpa", "number", true, ">=0.0", true),
                            new SchemaField("graduationYear", "number", true, null, true),
                            new SchemaField("credentialId", "string", true, null, false),
                            new SchemaField("issueDate", "date", true, null, true)
                    ))
                    .build();

            // 2. Employment Schema (FULL DEMO)
            CredentialSchema empSchema = CredentialSchema.builder()
                    .domain("employment")
                    .name("Employment Verification")
                    .version("1.0")
                    .fields(List.of(
                            new SchemaField("employeeName", "string", true, null, true),
                            new SchemaField("employeeId", "string", true, null, false),
                            new SchemaField("organization", "string", true, null, true),
                            new SchemaField("designation", "string", true, null, true),
                            new SchemaField("department", "string", true, null, true),
                            new SchemaField("joiningDate", "date", true, null, true),
                            new SchemaField("leavingDate", "date", false, null, true),
                            new SchemaField("experienceYears", "number", true, ">=0", true),
                            new SchemaField("employmentStatus", "string", true, null, true),
                            new SchemaField("credentialId", "string", true, null, false),
                            new SchemaField("issueDate", "date", true, null, true)
                    ))
                    .build();

            // 3. Healthcare Schema (SCHEMA READY)
            CredentialSchema healthSchema = CredentialSchema.builder()
                    .domain("healthcare")
                    .name("Medical Practitioner License")
                    .version("1.0")
                    .fields(List.of(
                            new SchemaField("personName", "string", true, null, true),
                            new SchemaField("licenseNumber", "string", true, null, false),
                            new SchemaField("licenseType", "string", true, null, true),
                            new SchemaField("issuingAuthority", "string", true, null, true),
                            new SchemaField("issueDate", "date", true, null, true),
                            new SchemaField("expiryDate", "date", true, null, true),
                            new SchemaField("status", "string", true, null, true)
                    ))
                    .build();

            // 4. Government / Legal Schema (SCHEMA READY)
            CredentialSchema govSchema = CredentialSchema.builder()
                    .domain("government")
                    .name("Government Identity Record")
                    .version("1.0")
                    .fields(List.of(
                            new SchemaField("holderName", "string", true, null, true),
                            new SchemaField("documentType", "string", true, null, true),
                            new SchemaField("documentNumber", "string", true, null, false),
                            new SchemaField("issuingAuthority", "string", true, null, true),
                            new SchemaField("issueDate", "date", true, null, true),
                            new SchemaField("expiryDate", "date", true, null, true),
                            new SchemaField("status", "string", true, null, true)
                    ))
                    .build();

            schemaRepository.saveAll(List.of(eduSchema, empSchema, healthSchema, govSchema));
            log.info("Successfully seeded Education, Employment, Healthcare, and Government schemas.");
        }
    }

    public List<CredentialSchema> getAllSchemas() {
        return schemaRepository.findAll();
    }

    public List<CredentialSchema> getSchemasByDomain(String domain) {
        return schemaRepository.findByDomain(domain);
    }

    public Optional<CredentialSchema> getSchemaById(String id) {
        return schemaRepository.findById(id);
    }

    public CredentialSchema createSchema(CredentialSchema schema) {
        return schemaRepository.save(schema);
    }
}
