package com.manager.task_manager.services.implementations;

import com.manager.task_manager.domains.User;
import com.manager.task_manager.domains.dto.UserDto;
import com.manager.task_manager.domains.dto.UserUpdateDto;
import com.manager.task_manager.exceptions.EtAuthException;
import com.manager.task_manager.exceptions.EtBadRequestException;
import com.manager.task_manager.exceptions.EtResourceNotFoundException;
import com.manager.task_manager.repositories.RegistrationRepository;
import com.manager.task_manager.repositories.UserRepository;
import com.manager.task_manager.services.interfaces.UserService;
import jakarta.transaction.Transactional;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
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
            if (!Objects.equals(newEmail, "") && newEmail != null) {
                newEmail = newEmail.toLowerCase();
                if (!pattern.matcher(newEmail).matches()) throw new EtBadRequestException("Invalid email format");
            }

            User existingUser = registrationRepository.findByEmail(newEmail);
            if (existingUser != null) throw new EtBadRequestException("Email already in use");

            User userWithPhoneNo = registrationRepository.findByPhone(user.getPhone());
            if (userWithPhoneNo != null) throw new EtBadRequestException("phone no already in use");

            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(12));
                user.setPassword(hashedPassword);
            }

            user.setIs_active(true);
            user.setProfile("default.png");
            ;
            user.setCreatedAt(java.time.LocalDateTime.now());
            user.setUpdatedAt(java.time.LocalDateTime.now());

            return registrationRepository.save(user);
        } catch (Exception error) {
            System.out.println("the error is here" + error);
            throw new EtBadRequestException("Invalid details. Failed to create new user");
        }
    }

    @Override
    public List<User> allUsers(String role) {
        try {
            if (!Objects.equals(role, "admin")) throw new EtBadRequestException("Not enough permissions");
            return userRepository.findAll();
        } catch (Exception error) {
            throw new EtResourceNotFoundException("Invalid details. Failed to create new user");
        }
    }

    @Override
    public User findMe(Long id) {
        return userRepository.findById(id);
    }

    private UserDto convertToDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user.getId(), user.getFirst_name(), user.getLast_name(), user.getEmail());
    }

    @Override
    public UserDto updateUser(String role, Long id, UserUpdateDto userUpdateDto) throws EtBadRequestException {
        if(!Objects.equals(role, "admin")) throw new EtAuthException("Not authorised to carry out this function");

        User existingUser = userRepository.findById(id);
        if(existingUser == null) throw new EtResourceNotFoundException("User not found");

        BiConsumer<String, Consumer<String>> updateIfNotNull = (value, setter) -> {
            if (value != null) setter.accept(value);
        };

        updateIfNotNull.accept(userUpdateDto.getFirst_name(), existingUser::setFirst_name);
        updateIfNotNull.accept(userUpdateDto.getLast_name(), existingUser::setLast_name);

        String newEmail = userUpdateDto.getEmail();
        if (newEmail != null && !newEmail.equals(existingUser.getEmail())) {
            User userWithEmail = userRepository.findByEmail(newEmail);
            if (userWithEmail != null && !userWithEmail.getId().equals(existingUser.getId())) {
                throw new EtBadRequestException("Email already in use by another user.");
            }
            existingUser.setEmail(newEmail);
        }

        String newPhone = userUpdateDto.getPhone();
        if (newPhone != null && !newPhone.equals(existingUser.getPhone())) {
            User userWithPhone = userRepository.findByPhone(newPhone);
            if (userWithPhone != null && !userWithPhone.getId().equals(existingUser.getId())) {
                throw new EtBadRequestException("Phone number already in use by another user.");
            }
            existingUser.setPhone(newPhone);
        }

        updateIfNotNull.accept(userUpdateDto.getId_no(), existingUser::setId_no);
        updateIfNotNull.accept(userUpdateDto.getBio(), existingUser::setBio);
        updateIfNotNull.accept(userUpdateDto.getGender(), existingUser::setGender);
        if (userUpdateDto.getDob() != null) existingUser.setDob(userUpdateDto.getDob());
        updateIfNotNull.accept(userUpdateDto.getCountry(), existingUser::setCountry);
        updateIfNotNull.accept(userUpdateDto.getCounty(), existingUser::setCounty);
        updateIfNotNull.accept(userUpdateDto.getLocation(), existingUser::setLocation);
        updateIfNotNull.accept(userUpdateDto.getCity(), existingUser::setCity);
        updateIfNotNull.accept(userUpdateDto.getProfile(), existingUser::setProfile);

        if (userUpdateDto.getRole() != null) existingUser.setRole(userUpdateDto.getRole());
        if (userUpdateDto.getIs_active() != null) existingUser.setIs_active(userUpdateDto.getIs_active());

        existingUser.setUpdatedAt(LocalDateTime.now());

        User updatedUser = registrationRepository.save(existingUser);
        return convertToDto(updatedUser);
    }
}

