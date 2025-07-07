package com.manager.task_manager.services.implementations;

import com.manager.task_manager.domains.User;
import com.manager.task_manager.domains.enums.UserRoles;
import com.manager.task_manager.exceptions.EtBadRequestException;
import com.manager.task_manager.exceptions.EtConflictException;
import com.manager.task_manager.exceptions.EtResourceNotFoundException;
import com.manager.task_manager.repositories.RegistrationRepository;
import com.manager.task_manager.services.interfaces.RegistrationService;
import jakarta.transaction.Transactional;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.regex.Pattern;

@Service
@Transactional
public class RegistrationServiceImpl implements RegistrationService {
    @Autowired
    RegistrationRepository registrationRepository;

    @Override
    public User registerUser(String first_name, String last_name, String email, String phone, String password, String role) throws EtResourceNotFoundException {
        Pattern pattern = Pattern.compile("^(.+)@(.+)$");
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt(12));

        try {

            if(!Objects.equals(email, "") && email != null) {
                email = email.toLowerCase();
                if(!pattern.matcher(email).matches()) throw new EtBadRequestException("Invalid email format");
            }

            User existingUser = registrationRepository.findByEmail(email);
            if(existingUser != null) throw new EtBadRequestException("Email already in use");

            User userWithPhoneNo = registrationRepository.findByPhone(phone);
            if(userWithPhoneNo != null) throw new EtBadRequestException("phone no already in use");


            User user = new User();
            user.setFirst_name(first_name);
            user.setLast_name(last_name);
            user.setEmail(email);
            user.setPhone(phone);
            user.setIs_active(true);
            user.setProfile("default.png");
            user.setPassword(hashedPassword);
            user.setRole(UserRoles.valueOf(role));
            user.setCreatedAt(java.time.LocalDateTime.now());
            user.setUpdatedAt(java.time.LocalDateTime.now());

            return registrationRepository.save(user);
        } catch (Exception error) {
            throw new EtResourceNotFoundException("Invalid details. Failed to create new user");
        }
    }

    @Override
    public User loginUser(String identifier, String password) throws EtBadRequestException {
        try {
            Pattern pattern = Pattern.compile("^(.+)@(.+)$");
            User user;
            if (pattern.matcher(identifier).matches()) {
                user = registrationRepository.findByEmail(identifier);
            } else {
                user = registrationRepository.findByPhone(identifier);
            }

            return user;
        } catch (Exception error) {
            throw new EtBadRequestException("Invalid details. check password or email");
        }
    }
}