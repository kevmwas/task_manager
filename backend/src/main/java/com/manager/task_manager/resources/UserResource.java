package com.manager.task_manager.resources;

import com.manager.task_manager.domains.User;
import com.manager.task_manager.services.interfaces.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/v1")
public class UserResource {
    @Autowired
    UserService userService;

    @PostMapping("/add-user")
    public ResponseEntity<Map<String, Object>> addUser(@RequestBody User user) {
        userService.addNewUser(user);

        Map<String, Object> filteredUser = new HashMap<>();
        filteredUser.put("first_name", user.getFirst_name());
        filteredUser.put("last_name", user.getLast_name());
        filteredUser.put("profile", user.getProfile());
        filteredUser.put("gender", user.getGender());
        filteredUser.put("email", user.getEmail());
        filteredUser.put("role", user.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("user", filteredUser);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/all-users")
    public ResponseEntity<List<User>> getAllUsers(HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        List<User> users = userService.allUsers(role);
        users.forEach(user -> user.setPassword(null));
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PatchMapping("/update-user")
    public ResponseEntity<Map<String, Boolean>> updateUser(HttpServletRequest request,
                                                           @RequestBody User user) {
        String role = (String) request.getAttribute("role");
        userService.updateUser(role, user);
        Map<String, Boolean> map = new HashMap<>();
        map.put("User successfully updated", true);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
//
//    @PatchMapping("/update-self")
//    public ResponseEntity<Map<String, Boolean>> updateSelf(HttpServletRequest request,
//                                                           @RequestBody Users users) {
//        int user_id = (Integer) request.getAttribute("user_id");
//        userService.updateSelf(user_id, users);
//        Map<String, Boolean> map = new HashMap<>();
//        map.put("User successfully updated", true);
//        return new ResponseEntity<>(map, HttpStatus.OK);
//    }

//    @PatchMapping("/update-password")
//    public ResponseEntity<Map<String, Boolean>> updateUserPwd(HttpServletRequest request,
//                                                              @RequestBody Users users) {
//        int userId = (Integer) request.getAttribute("user_id");
//        String role = (String) request.getAttribute("role");
//        userService.updateUserPassword(userId, role, users);
//        Map<String, Boolean> map = new HashMap<>();
//        map.put("User password updated successfully", true);
//        return new ResponseEntity<>(map, HttpStatus.OK);
//    }
//
//    @PatchMapping("/update-self-password")
//    public ResponseEntity<Map<String, Boolean>> updateSelfPwd(HttpServletRequest request,
//                                                              @RequestBody Users users) {
//        int userId = (Integer) request.getAttribute("user_id");
//        userService.updateSelfPassword(userId, users);
//        Map<String, Boolean> map = new HashMap<>();
//        map.put("User password updated successfully", true);
//        return new ResponseEntity<>(map, HttpStatus.OK);
//    }
}
