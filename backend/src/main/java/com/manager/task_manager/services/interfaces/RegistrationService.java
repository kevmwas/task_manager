package com.manager.task_manager.services.interfaces;

import com.manager.task_manager.domains.User;
import com.manager.task_manager.exceptions.EtAuthException;
import com.manager.task_manager.exceptions.EtBadRequestException;

public interface RegistrationService {
    User registerUser(String first_name, String last_name, String email, String phone, String password) throws EtBadRequestException;
    User loginUser(String identifier, String password) throws EtBadRequestException;
}
