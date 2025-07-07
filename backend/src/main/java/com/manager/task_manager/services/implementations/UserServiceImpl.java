package com.manager.task_manager.services.implementations;

import com.manager.task_manager.domains.User;
import com.manager.task_manager.exceptions.EtBadRequestException;
import com.manager.task_manager.exceptions.EtResourceNotFoundException;
import com.manager.task_manager.repositories.RegistrationRepository;
import com.manager.task_manager.repositories.UserRepository;
import com.manager.task_manager.services.interfaces.UserService;
import jakarta.transaction.Transactional;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.regex.Pattern;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    RegistrationRepository registrationRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public User addNewUser(User user) {
        Pattern pattern = Pattern.compile("^(.+)@(.+)$");
        try {
            String newEmail = user.getEmail();
            if(!Objects.equals(newEmail, "") && newEmail != null) {
                newEmail = newEmail.toLowerCase();
                if(!pattern.matcher(newEmail).matches()) throw new EtBadRequestException("Invalid email format");
            }

            User existingUser = registrationRepository.findByEmail(newEmail);
            if(existingUser != null) throw new EtBadRequestException("Email already in use");

            User userWithPhoneNo = registrationRepository.findByPhone(user.getPhone());
            if(userWithPhoneNo != null) throw new EtBadRequestException("phone no already in use");

            if(user.getPassword() != null && !user.getPassword().isEmpty()) {
                String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(12));
                user.setPassword(hashedPassword);
            }

            user.setIs_active(true);
            user.setProfile("default.png");;
            user.setCreatedAt(java.time.LocalDateTime.now());
            user.setUpdatedAt(java.time.LocalDateTime.now());

            return registrationRepository.save(user);
        } catch (Exception error) {
            throw new EtResourceNotFoundException("Invalid details. Failed to create new user");
        }
    }

    @Override
    public List<User> allUsers(String role) {
        try {
            if(!Objects.equals(role, "admin")) throw new EtBadRequestException("Not enough permissions");
            return userRepository.findAll();
        } catch (Exception error) {
            throw new EtResourceNotFoundException("Invalid details. Failed to create new user");
        }
    }
}
