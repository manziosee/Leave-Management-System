package com.africahr.auth.dto;

import java.util.List;

public class UserResponse {
    private Long id;
    private String email;
    private String username;
    private String name;
    private List<String> roles;
    private String profilePicture;

    public UserResponse(Long id, String username, String profilePicture, String email, List<String> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.profilePicture = profilePicture;
        this.roles = roles;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public String getUsername() {
        return username;
    }

    public List<String> getRoles() {
        return roles;
    }
}