package com.manager.task_manager.resources;

import com.manager.task_manager.Constants;
import com.manager.task_manager.Encryption;
import com.manager.task_manager.domains.User;
import com.manager.task_manager.services.interfaces.RegistrationService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("")
public class RegistrationResource {
    Encryption encryption = new Encryption();

    @Autowired
    RegistrationService registrationService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, Object> userMap) {
        String identifier = (String) userMap.get("identifier");
        String password = (String) userMap.get("password");
        User user = registrationService.loginUser(identifier, password);
        
        Map<String, Object> filteredUser = new HashMap<>();
        filteredUser.put("first_name", user.getFirst_name());
        filteredUser.put("last_name", user.getLast_name());
        filteredUser.put("profile", user.getProfile());
        filteredUser.put("gender", user.getGender());
        filteredUser.put("email", user.getEmail());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", generateJWTToken(user).get("token"));
        response.put("user", filteredUser);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody Map<String, Object>  userMap) {
        String first_name = (String) userMap.get("first_name");
        String last_name = (String) userMap.get("last_name");
        String email = (String) userMap.get("email");
        String phone = (String) userMap.get("phone");
        String password = (String) userMap.get("password");
        User user = registrationService.registerUser(first_name, last_name, email, phone, password);

        Map<String, Object> filteredUser = new HashMap<>();
        filteredUser.put("first_name", user.getFirst_name());
        filteredUser.put("last_name", user.getLast_name());
        filteredUser.put("profile", user.getProfile());
        filteredUser.put("gender", user.getGender());
        filteredUser.put("email", user.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("token", generateJWTToken(user).get("token"));
        response.put("user", filteredUser);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private Map<String, String> generateJWTToken(User users) {
           long timestamp  = System.currentTimeMillis();
           String token = Jwts.builder().signWith(SignatureAlgorithm.HS512, Constants.generateSecretKey())
                   .setIssuedAt(new Date(timestamp))
                   .setExpiration(new Date(timestamp + Constants.TOKEN_VALIDITY))
                   .claim("id", encryption.encrypt(Long.toString(users.getId()), Constants.ID_SECRET_KEY))
                   .claim("first_name", users.getFirst_name())
                   .claim("last_name", users.getLast_name())
                   .claim("profile", users.getProfile())
                   .compact();

           Map<String, String> map = new HashMap<>();
           map.put("token", token);
           return map;
    }
}
