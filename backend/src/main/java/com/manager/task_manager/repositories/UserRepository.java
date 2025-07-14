package com.manager.task_manager.repositories;

import com.manager.task_manager.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    List<User> findAllByOrderByUpdatedAtDesc();

    User findById(Long id);

    User findByEmail(String email);

    User findByPhone(String phone);
}
