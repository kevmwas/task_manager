package com.manager.task_manager.services.interfaces;

import com.manager.task_manager.domains.User;
import com.manager.task_manager.domains.dto.UserDto;
import com.manager.task_manager.domains.dto.UserUpdateDto;
import com.manager.task_manager.exceptions.EtBadRequestException;

import java.util.List;

public interface UserService {
    User addNewUser(User user) throws EtBadRequestException;

    List<User> allUsers(String role) throws EtBadRequestException;

    User findMe(Long id);

    User updateUser(String role, Long id, UserUpdateDto userUpdateDto) throws EtBadRequestException;
}
