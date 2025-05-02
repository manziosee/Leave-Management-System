package com.africahr.auth.config;

import com.africahr.auth.model.ERole;
import com.africahr.auth.model.Role;
import com.africahr.auth.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
    @Bean
    public CommandLineRunner initRoles(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.count() == 0) {
                Role userRole = new Role(ERole.ROLE_USER);
                Role modRole = new Role(ERole.ROLE_MODERATOR);
                Role adminRole = new Role(ERole.ROLE_ADMIN);

                roleRepository.save(userRole);
                roleRepository.save(modRole);
                roleRepository.save(adminRole);
            }
        };
    }
}