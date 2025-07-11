package com.manager.task_manager.repositories;

import com.manager.task_manager.domains.Task;
import com.manager.task_manager.domains.enums.TaskStatus;
import com.manager.task_manager.exceptions.EtBadRequestException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, String> {
    Task save(Task task) throws EtBadRequestException;
    long countTaskByStatusAndAssignedTo_Id(TaskStatus status, Long assignedToId);
    List<Task> findByAssignedTo_Id(Long assignedTo);
    Task findById(Long id);
    void deleteById(Long id);
}
