package com.manager.task_manager;

import com.manager.task_manager.domains.User;
import com.manager.task_manager.domains.enums.UserRoles;
import com.manager.task_manager.resources.UserResource;
import com.manager.task_manager.services.interfaces.RegistrationService;
import com.manager.task_manager.services.interfaces.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletRequest;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class UserResourceTests {
    @Test
    void testRegisterUser() {
        // Arrange
        com.manager.task_manager.services.interfaces.RegistrationService registrationService = mock(RegistrationService.class);

        String firstName = "Alice";
        String lastName = "Smith";
        String email = "alice.smith@example.com";
        String phone = "1234567890";
        String password = "password123";

        User user = new User();
        user.setFirst_name(firstName);
        user.setLast_name(lastName);
        user.setEmail(email);
        user.setPhone(phone);
        user.setPassword(password);
        user.setRole(UserRoles.user);

        when(registrationService.registerUser(firstName, lastName, email, phone, password)).thenReturn(user);

        User registeredUser = registrationService.registerUser(firstName, lastName, email, phone, password);

        assertThat(registeredUser).isNotNull();
        assertThat(registeredUser.getFirst_name()).isEqualTo(firstName);
        assertThat(registeredUser.getLast_name()).isEqualTo(lastName);
        assertThat(registeredUser.getEmail()).isEqualTo(email);
        assertThat(registeredUser.getPhone()).isEqualTo(phone);
        assertThat(registeredUser.getRole()).isEqualTo(UserRoles.user);

        verify(registrationService, times(1)).registerUser(firstName, lastName, email, phone, password);
    }

    @Test
    void testLoginUser() {
        // Arrange
        com.manager.task_manager.services.interfaces.RegistrationService registrationService = mock(RegistrationService.class);

        String identifier = "alice.smith@example.com";
        String password = "password123";

        User user = new User();
        user.setEmail(identifier);
        user.setPassword(password);
        user.setFirst_name("Alice");
        user.setLast_name("Smith");
        user.setRole(UserRoles.user);

        when(registrationService.loginUser(identifier, password)).thenReturn(user);

        User loggedInUser = registrationService.loginUser(identifier, password);

        assertThat(loggedInUser).isNotNull();
        assertThat(loggedInUser.getEmail()).isEqualTo(identifier);
        assertThat(loggedInUser.getFirst_name()).isEqualTo("Alice");
        assertThat(loggedInUser.getLast_name()).isEqualTo("Smith");
        assertThat(loggedInUser.getRole()).isEqualTo(UserRoles.user);

        verify(registrationService, times(1)).loginUser(identifier, password);
    }


    private UserService userService;
    private UserResource userResource;

    @BeforeEach
    void setUp() {
        userService = Mockito.mock(UserService.class);
        userResource = new UserResource();
        userResource.userService = userService;
    }

    @Test
    void testAddUser() {
        User newUser = new User();
        newUser.setFirst_name("Jane");
        newUser.setLast_name("Doe");
        newUser.setEmail("jane.doe@example.com");
        newUser.setPhone("1234567890");
        newUser.setPassword("password123");
        newUser.setRole(UserRoles.user);

        when(userService.addNewUser(any(User.class))).thenReturn(newUser);

        ResponseEntity<User> response = userResource.addUser(newUser);

        verify(userService, times(1)).addNewUser(any(User.class));
        assertThat(response.getStatusCode()).isEqualTo(201);
        User returnedUser = response.getBody();
        assertThat(returnedUser).isNotNull();
        assertThat(returnedUser.getFirst_name()).isEqualTo("Jane");
        assertThat(returnedUser.getLast_name()).isEqualTo("Doe");
        assertThat(returnedUser.getEmail()).isEqualTo("jane.doe@example.com");
        assertThat(returnedUser.getPhone()).isEqualTo("1234567890");
        assertThat(returnedUser.getRole()).isEqualTo(UserRoles.user);
    }

    @Test
    void testGetAllUsers() {
        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getAttribute("role")).thenReturn("admin");

        User user1 = new User();
        user1.setPassword("secret");
        User user2 = new User();
        user2.setPassword("secret2");
        List<User> users = Arrays.asList(user1, user2);

        when(userService.allUsers("admin")).thenReturn(users);

        ResponseEntity<List<User>> response = userResource.getAllUsers(request);

        verify(userService, times(1)).allUsers("admin");
        assertThat(response.getStatusCode()).isEqualTo(200);
        List<User> returnedUsers = response.getBody();
        assertThat(returnedUsers).hasSize(2);
        assertThat(returnedUsers.get(0).getPassword()).isNull();
        assertThat(returnedUsers.get(1).getPassword()).isNull();
    }
}
