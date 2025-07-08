package com.manager.task_manager.repositories;

import com.manager.task_manager.domains.Task;
import com.manager.task_manager.exceptions.EtBadRequestException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, String> {
    Task save(Task task) throws EtBadRequestException;
    long countByStatus(String status) throws EtBadRequestException;
    List<Task> findAllByAssigned_to(Long assigned_to) throws EtBadRequestException;
}
