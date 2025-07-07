package com.manager.task_manager.filters;

import com.manager.task_manager.utils.Constants;
import com.manager.task_manager.utils.Encryption;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.GenericFilterBean;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class AuthFilter  extends GenericFilterBean {
    Encryption encryption = new Encryption();
    private final SecretKey API_SIGNING_KEY;

    public AuthFilter() {
        this.API_SIGNING_KEY = Keys.hmacShaKeyFor(Constants.API_SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        if (httpRequest.getMethod().equalsIgnoreCase("OPTIONS")) {
            chain.doFilter(request, response);
            return;
        }

        String authHeader = httpRequest.getHeader("Authorization");

        if(authHeader != null) {
            String[] authHeaderArr = authHeader.split("Bearer ");
            if(authHeaderArr.length > 1 && authHeaderArr[1] != null) {
                String token = authHeaderArr[1];
                try {
                    JwtParser parser = Jwts.parser()
                            .verifyWith(API_SIGNING_KEY)
                            .build();

                    Claims claims = parser.parseSignedClaims(token).getPayload();

                    String idClaim = (String) claims.get("id");
                    if (idClaim == null) {
                        throw new IllegalArgumentException("JWT 'id' claim is missing or not a String.");
                    }
                    int decryptedID = Integer.parseInt(encryption.decrypt(idClaim, Constants.ID_SECRET_KEY));
                    httpRequest.setAttribute("id", decryptedID);
                    httpRequest.setAttribute("role", claims.get("role"));
                } catch(Exception error) {
                    httpResponse.sendError(HttpStatus.FORBIDDEN.value(), "Invalid or expired token");
                    return;
                }
            } else {
                httpResponse.sendError(HttpStatus.FORBIDDEN.value(), "Authorisation token must " +
                        "be a bearer [token]");
                return;
            }
        } else {
            httpResponse.sendError(HttpStatus.FORBIDDEN.value(), "Authorisation token must be provided");
            return;
        }
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
    }

//    @Override
//    public void init(jakarta.servlet.FilterConfig config) throws ServletException {
//    }
}