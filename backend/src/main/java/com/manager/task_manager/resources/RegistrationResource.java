package com.manager.task_manager.resources;

import com.manager.task_manager.utils.Constants;
import com.manager.task_manager.domains.User;
import com.manager.task_manager.services.interfaces.RegistrationService;
import com.manager.task_manager.utils.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("")
public class RegistrationResource {
   private final JwtService jwtService;

    public RegistrationResource() {
        this.jwtService = new JwtService(Constants.API_SECRET_KEY);
    }

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
        filteredUser.put("role", user.getRole());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", jwtService.generateJWTToken(user));
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
        String role = (String) userMap.get("role");
        User user = registrationService.registerUser(first_name, last_name, email, phone, password, role);

        Map<String, Object> filteredUser = new HashMap<>();
        filteredUser.put("first_name", user.getFirst_name());
        filteredUser.put("last_name", user.getLast_name());
        filteredUser.put("profile", user.getProfile());
        filteredUser.put("gender", user.getGender());
        filteredUser.put("email", user.getEmail());
        filteredUser.put("role", user.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("token",jwtService.generateJWTToken(user) );
        response.put("user", filteredUser);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

