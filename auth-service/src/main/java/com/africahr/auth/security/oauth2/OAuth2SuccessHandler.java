package com.africahr.auth.security.oauth2;

import jakarta.servlet.ServletException; // Updated to Jakarta
import jakarta.servlet.http.HttpServletRequest; // Updated to Jakarta
import jakarta.servlet.http.HttpServletResponse; // Updated to Jakarta
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import com.africahr.auth.security.jwt.JwtUtils;

import java.io.IOException;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtUtils jwtUtils;

    public OAuth2SuccessHandler(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        String token = jwtUtils.generateJwtToken(authentication);
        String redirectUrl = UriComponentsBuilder.fromUriString("/oauth2/redirect")
                .queryParam("token", token)
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}