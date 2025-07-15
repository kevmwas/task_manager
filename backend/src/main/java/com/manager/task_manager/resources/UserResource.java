package com.manager.task_manager.resources;

import com.manager.task_manager.domains.User;
import com.manager.task_manager.domains.dto.UserUpdateDto;
import com.manager.task_manager.exceptions.EtBadRequestException;
import com.manager.task_manager.services.interfaces.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/v1")
public class UserResource {
    @Autowired
    public
    UserService userService;

    @PostMapping("/add-user")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User newUser = userService.addNewUser(user);
        newUser.setPassword(null);

        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    @GetMapping("/all-users")
    public ResponseEntity<List<User>> getAllUsers(HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        List<User> users = userService.allUsers(role);
        users.forEach(user -> user.setPassword(null));
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PatchMapping("/update-user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, HttpServletRequest request, @RequestBody UserUpdateDto userUpdateDto) {
        try {
            String role = (String) request.getAttribute("role");
            User updatedUser = userService.updateUser(role, id, userUpdateDto);
            return ResponseEntity.ok(updatedUser);
        } catch (EtBadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/my-profile")
    public ResponseEntity<User> getMe(HttpServletRequest request) {
        int id = (Integer) request.getAttribute("id");
        User user = userService.findMe((long) id);

        user.setPassword(null);
        user.setOtp_code(null);
        user.setOtp_expiration(null);

        return new ResponseEntity<>(user, HttpStatus.OK);
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
