package com.trustverse.controller;

import com.trustverse.model.User;
import com.trustverse.security.UserPrincipal;
import com.trustverse.service.AuthenticationService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;
        private String role;
        private String organization;
        private String walletAddress;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationService.JwtAuthResponse> register(@RequestBody RegisterRequest req) {
        AuthenticationService.JwtAuthResponse response = authenticationService.register(
                req.getName(),
                req.getEmail(),
                req.getPassword(),
                req.getRole(),
                req.getOrganization(),
                req.getWalletAddress()
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationService.JwtAuthResponse> login(@RequestBody LoginRequest req) {
        AuthenticationService.JwtAuthResponse response = authenticationService.login(req.getEmail(), req.getPassword());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            return ResponseEntity.status(401).build();
        }
        User user = authenticationService.getUserByEmail(userPrincipal.getEmail());
        return ResponseEntity.ok(user);
    }
}
