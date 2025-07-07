package com.manager.task_manager.repositories;

import com.manager.task_manager.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//public interface RegistrationRepository {
//    User findByEmailAndPassword (String email, String password) throws EtAuthException;
//    long create(String first_name, String last_name, String email, String phone, String password) throws EtAuthException;
//    User loginUser (String identifier, String password) throws EtAuthException;
//    Admin loginAdmin (String identifier, String password) throws EtAuthException;
//    Integer getCountByEmail(String email);
//    Integer getCountByPhone(String phone);
//}

@Repository
public interface RegistrationRepository extends JpaRepository<User, String> {
    User save(User user);

    User findByEmail(String email);

    User findByPhone(String phone);

}
