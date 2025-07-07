package com.manager.task_manager.repositories;

import com.manager.task_manager.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
//    List<User> findAllUsers(String role);
//
//    List<User> findAllAdmins(String role);

   // User update(User user);
}
