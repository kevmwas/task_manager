package com.manager.task_manager;

import com.manager.task_manager.domains.Task;
import com.manager.task_manager.domains.User;
import com.manager.task_manager.domains.dto.TaskDto;
import com.manager.task_manager.domains.dto.UserUpdateDto;
import com.manager.task_manager.domains.enums.TaskStatus;
import com.manager.task_manager.domains.enums.UserRoles;
import com.manager.task_manager.resources.TaskResource;
import com.manager.task_manager.resources.UserResource;
import com.manager.task_manager.services.interfaces.RegistrationService;
import com.manager.task_manager.services.interfaces.TaskService;
import com.manager.task_manager.services.interfaces.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletRequest;

import java.lang.reflect.Field;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class RegistrationResourceTests {
    @Test
    void testRegisterUser() {
        RegistrationService registrationService = mock(RegistrationService.class);

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
        RegistrationService registrationService = mock(RegistrationService.class);

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
}
class UserResourceTests {
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
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
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
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        List<User> returnedUsers = response.getBody();
        assertThat(returnedUsers).hasSize(2);
        assertThat(returnedUsers.get(0).getPassword()).isNull();
        assertThat(returnedUsers.get(1).getPassword()).isNull();
    }

    @Test
    void testUpdateUser() {
        Long userId = 1L;
        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getAttribute("role")).thenReturn("admin");

        UserUpdateDto updateDto = new UserUpdateDto();
        updateDto.setFirst_name("Updated");
        updateDto.setLast_name("User");
        updateDto.setEmail("updated.user@example.com");
        updateDto.setPhone("9876543210");

        User updatedUser = new User();
        updatedUser.setId(userId);
        updatedUser.setFirst_name("Updated");
        updatedUser.setLast_name("User");
        updatedUser.setEmail("updated.user@example.com");
        updatedUser.setPhone("9876543210");

        when(userService.updateUser(eq("admin"), eq(userId), any(UserUpdateDto.class))).thenReturn(updatedUser);

        ResponseEntity<User> response = userResource.updateUser(userId, request, updateDto);

        verify(userService, times(1)).updateUser(eq("admin"), eq(userId), any(UserUpdateDto.class));
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        User returnedUser = response.getBody();
        assertThat(returnedUser).isNotNull();
        assertThat(returnedUser.getFirst_name()).isEqualTo("Updated");
        assertThat(returnedUser.getLast_name()).isEqualTo("User");
        assertThat(returnedUser.getEmail()).isEqualTo("updated.user@example.com");
        assertThat(returnedUser.getPhone()).isEqualTo("9876543210");
    }
}

class TaskResourceTests {
    @Test
    void testAddTask() throws Exception {
        TaskService taskService = mock(TaskService.class);
        TaskResource taskResource = new TaskResource();

        Field serviceField = TaskResource.class.getDeclaredField("taskService");
        serviceField.setAccessible(true);
        serviceField.set(taskResource, taskService);

        User assignedUser = new User();
        assignedUser.setId(1L);

        Task newTask = new Task();
        newTask.setTitle("Test Task");
        newTask.setDescription("This is a test task");
        newTask.setStatus(TaskStatus.valueOf("TODO"));
        newTask.setAssignedTo(assignedUser);

        when(taskService.addNewTask(any(Task.class))).thenReturn(newTask);

        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getAttribute("id")).thenReturn(1);

        ResponseEntity<Task> response = taskResource.addTask(request, newTask);

        verify(taskService, times(1)).addNewTask(any(Task.class));
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        Task returnedTask = response.getBody();
        assertThat(returnedTask).isNotNull();
        assertThat(returnedTask.getTitle()).isEqualTo("Test Task");
        assertThat(returnedTask.getDescription()).isEqualTo("This is a test task");
        assertThat(returnedTask.getStatus()).isEqualTo(TaskStatus.valueOf("TODO"));
        assertThat(returnedTask.getAssignedTo()).isNotNull();
        assertThat(returnedTask.getAssignedTo().getId()).isEqualTo(1L);
    }

    @Test
    void testUpdateTask() {
        TaskService taskService = mock(TaskService.class);
        TaskResource taskResource = new TaskResource();
        try {
            Field serviceField = TaskResource.class.getDeclaredField("taskService");
            serviceField.setAccessible(true);
            serviceField.set(taskResource, taskService);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        Long taskId = 1L;
        TaskDto updateDto = new TaskDto();
        updateDto.setTitle("Updated Task");
        updateDto.setDescription("Updated description");
        updateDto.setStatus(TaskStatus.valueOf("COMPLETED"));

        TaskDto updatedTask = new TaskDto();
        updatedTask.setId(taskId);
        updatedTask.setTitle("Updated Task");
        updatedTask.setDescription("Updated description");
        updatedTask.setStatus(TaskStatus.valueOf("COMPLETED"));

        when(taskService.updateTask(eq(taskId), any(TaskDto.class))).thenReturn(updatedTask);

        ResponseEntity<TaskDto> response = taskResource.updateTask(taskId, updateDto);

        verify(taskService, times(1)).updateTask(eq(taskId), any(TaskDto.class));
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        TaskDto returnedTask = response.getBody();
        assertThat(returnedTask).isNotNull();
        assertThat(returnedTask.getTitle()).isEqualTo("Updated Task");
        assertThat(returnedTask.getDescription()).isEqualTo("Updated description");
        assertThat(returnedTask.getStatus()).isEqualTo(TaskStatus.valueOf("COMPLETED"));
    }

    @Test
    void testGetMyTasks() throws Exception {
        TaskResource taskResource = new TaskResource();
        TaskService taskService = mock(TaskService.class);

        Field serviceField = TaskResource.class.getDeclaredField("taskService");
        serviceField.setAccessible(true);
        serviceField.set(taskResource, taskService);

        Long userId = 42L;

        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getAttribute("id")).thenReturn(userId.intValue());

        TaskDto taskDto1 = new TaskDto();
        taskDto1.setId(1L);
        taskDto1.setTitle("Task 1");
        taskDto1.setDescription("Description 1");
        taskDto1.setStatus(TaskStatus.valueOf("IN_PROGRESS"));

        TaskDto taskDto2 = new TaskDto();
        taskDto2.setId(2L);
        taskDto2.setTitle("Task 2");
        taskDto2.setDescription("Description 2");
        taskDto2.setStatus(TaskStatus.valueOf("COMPLETED"));

        List<TaskDto> myTasks = List.of(taskDto1, taskDto2);

        when(taskService.fndMyTasks(userId)).thenReturn(myTasks);

        ResponseEntity<List<TaskDto>> response = taskResource.getMyTasks(request);

        verify(taskService, times(1)).fndMyTasks(userId);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        List<TaskDto> returnedTasks = response.getBody();
        assertThat(returnedTasks).isNotNull();
        assertThat(returnedTasks.size()).isEqualTo(2);
        assertThat(returnedTasks.get(0).getTitle()).isEqualTo("Task 1");
        assertThat(returnedTasks.get(1).getTitle()).isEqualTo("Task 2");
    }
}
