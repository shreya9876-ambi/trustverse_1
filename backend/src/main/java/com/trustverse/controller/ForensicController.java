package com.trustverse.controller;

import com.trustverse.service.ForensicService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/forensics")
@RequiredArgsConstructor
public class ForensicController {

    private final ForensicService forensicService;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AnalyzeRequest {
        private String fileName;
        private String fileType;
        private long fileSize;
    }

    @PostMapping("/analyze")
    public ResponseEntity<ForensicService.ForensicResult> analyzeDocument(@RequestBody AnalyzeRequest req) {
        ForensicService.ForensicResult result = forensicService.analyzeDocument(
                req.getFileName() != null ? req.getFileName() : "certificate.pdf",
                req.getFileType() != null ? req.getFileType() : "application/pdf",
                req.getFileSize() > 0 ? req.getFileSize() : 102400L
        );
        return ResponseEntity.ok(result);
    }
}
