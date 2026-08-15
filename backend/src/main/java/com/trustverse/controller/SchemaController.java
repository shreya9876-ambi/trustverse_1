package com.trustverse.controller;

import com.trustverse.model.CredentialSchema;
import com.trustverse.service.SchemaService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schemas")
@RequiredArgsConstructor
public class SchemaController {

    private final SchemaService schemaService;

    @GetMapping
    public ResponseEntity<List<CredentialSchema>> getAllSchemas(@RequestParam(required = false) String domain) {
        if (domain != null && !domain.isEmpty()) {
            return ResponseEntity.ok(schemaService.getSchemasByDomain(domain));
        }
        return ResponseEntity.ok(schemaService.getAllSchemas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CredentialSchema> getSchemaById(@PathVariable String id) {
        return schemaService.getSchemaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CredentialSchema> createSchema(@RequestBody CredentialSchema schema) {
        return ResponseEntity.ok(schemaService.createSchema(schema));
    }
}
