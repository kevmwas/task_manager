package com.manager.task_manager.utils;

import com.manager.task_manager.domains.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

public class JwtService {

    Encryption encryption = new Encryption();
    private final SecretKey API_SIGNING_KEY;

    public JwtService(String apiSecretKeyString) {
        this.API_SIGNING_KEY = Keys.hmacShaKeyFor(apiSecretKeyString.getBytes(StandardCharsets.UTF_8));
    }

    public String generateJWTToken(User user) {
        long timestamp = System.currentTimeMillis();

        String token = Jwts.builder()
                .signWith(API_SIGNING_KEY, SignatureAlgorithm.HS512)
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date(timestamp + Constants.TOKEN_VALIDITY))
                .claim("id", encryption.encrypt(Long.toString(user.getId()), Constants.ID_SECRET_KEY))
                .claim("first_name", user.getFirst_name())
                .claim("last_name", user.getLast_name())
                .claim("phone", user.getPhone())
                .claim("email", user.getEmail())
                .claim("profile", user.getProfile())
                .claim("role", user.getRole())
                .compact();

        return token;
    }
}