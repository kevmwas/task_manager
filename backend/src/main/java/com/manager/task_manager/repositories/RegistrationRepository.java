package com.manager.task_manager.repositories;

import com.manager.task_manager.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrationRepository extends JpaRepository<User, String> {
    User save(User user);

    User findByEmail(String email);

    User findByPhone(String phone);

}
