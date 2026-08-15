package com.trustverse.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SchemaField {
    private String name;
    private String type; // string, number, date, boolean
    private boolean required;
    private String validation; // e.g. regex or rule range
    private boolean selectableForProof;
}
