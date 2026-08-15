package com.trustverse.service;

import com.trustverse.model.User;
import com.trustverse.repository.UserRepository;
import com.trustverse.security.JwtTokenProvider;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final DIDService didService;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class JwtAuthResponse {
        private String accessToken;
        private String tokenType;
        private User user;
    }

    @PostConstruct
    public void seedInitialDemoUsers() {
        if (userRepository.count() == 0) {
            log.info("Seeding initial TrustVerse demo users...");

            // 1. Issuer: PCCOER University
            User issuer = User.builder()
                    .name("PCCOER University Registrar")
                    .email("issuer@pccoer.edu")
                    .passwordHash(passwordEncoder.encode("IssuerPass123!"))
                    .role("ROLE_ISSUER")
                    .organization("Pimpri Chinchwad College of Engineering & Research")
                    .did(didService.generateOrgDid("pccoer"))
                    .walletAddress("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
                    .build();

            // 2. Holder: Riya Sharma
            User holder = User.builder()
                    .name("Riya Sharma")
                    .email("holder@trustverse.io")
                    .passwordHash(passwordEncoder.encode("HolderPass123!"))
                    .role("ROLE_HOLDER")
                    .organization("Computer Science Department")
                    .did(didService.generateUserDid("holder", "riyasharma"))
                    .walletAddress("0x3C44CdD1605330166787697201e857465239e761")
                    .build();

            // 3. Verifier: Acme Global Recruiter
            User verifier = User.builder()
                    .name("Acme Corp Talent Acquisition")
                    .email("verifier@acme.com")
                    .passwordHash(passwordEncoder.encode("VerifierPass123!"))
                    .role("ROLE_VERIFIER")
                    .organization("Acme Technologies Inc.")
                    .did(didService.generateUserDid("verifier", "acmecorp"))
                    .walletAddress("0x90F79bf6EB2c4f870365E785982E1f101E93b906")
                    .build();

            // 4. Admin
            User admin = User.builder()
                    .name("TrustVerse System Admin")
                    .email("admin@trustverse.io")
                    .passwordHash(passwordEncoder.encode("AdminPass123!"))
                    .role("ROLE_ADMIN")
                    .organization("TrustVerse Foundation")
                    .did("did:trustverse:admin:sys01")
                    .walletAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
                    .build();

            userRepository.saveAll(java.util.List.of(issuer, holder, verifier, admin));
            log.info("Successfully seeded demo Issuer, Holder, Verifier, and Admin accounts.");
        }
    }

    public JwtAuthResponse register(String name, String email, String password, String role, String organization, String walletAddress) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email address is already in use.");
        }

        String formattedRole = role != null && role.startsWith("ROLE_") ? role : "ROLE_" + (role != null ? role.toUpperCase() : "HOLDER");
        String did = didService.generateUserDid(formattedRole.replace("ROLE_", "").toLowerCase(), name);

        User user = User.builder()
                .name(name)
                .email(email)
                .passwordHash(passwordEncoder.encode(password))
                .role(formattedRole)
                .organization(organization != null ? organization : "")
                .did(did)
                .walletAddress(walletAddress != null ? walletAddress : "")
                .build();

        User savedUser = userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        return JwtAuthResponse.builder()
                .accessToken(jwt)
                .tokenType("Bearer")
                .user(savedUser)
                .build();
    }

    public JwtAuthResponse login(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        return JwtAuthResponse.builder()
                .accessToken(jwt)
                .tokenType("Bearer")
                .user(user)
                .build();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
