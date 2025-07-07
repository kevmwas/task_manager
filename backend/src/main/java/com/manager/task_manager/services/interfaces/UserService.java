package com.manager.task_manager.services.interfaces;

import com.manager.task_manager.domains.User;

import java.util.List;

public interface UserService {
    User addNewUser(User user);

    List<User> allUsers(String role);
}
