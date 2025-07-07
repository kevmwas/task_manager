package com.manager.task_manager.repositories;

import com.manager.task_manager.domains.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, String> {
    Task save(Task task);

}
