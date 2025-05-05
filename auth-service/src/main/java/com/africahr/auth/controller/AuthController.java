package com.africahr.auth.controller;

import com.africahr.auth.payload.request.LoginRequest;
import com.africahr.auth.payload.request.RegisterRequest;
import com.africahr.auth.payload.response.JwtResponse;
import com.africahr.auth.payload.response.UserResponse;
import com.africahr.auth.security.jwt.JwtUtils;
import com.africahr.auth.security.services.UserDetailsImpl;
import com.africahr.auth.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        com.africahr.auth.dto.RegisterRequest dtoRegisterRequest = new com.africahr.auth.dto.RegisterRequest();
        dtoRegisterRequest.setUsername(registerRequest.getUsername());
        dtoRegisterRequest.setEmail(registerRequest.getEmail());
        dtoRegisterRequest.setPassword(registerRequest.getPassword());
        dtoRegisterRequest.setRoles(registerRequest.getRoles());

        com.africahr.auth.dto.UserResponse dtoResponse = userService.registerUser(dtoRegisterRequest);

        UserResponse response = new UserResponse();
        response.setId(dtoResponse.getId());
        response.setUsername(dtoResponse.getUsername());
        response.setEmail(dtoResponse.getEmail());
        response.setRoles(dtoResponse.getRoles());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList())
        ));
    }
}