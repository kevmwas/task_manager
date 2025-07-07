package com.manager.task_manager.services.interfaces;

import com.manager.task_manager.domains.Task;

import java.util.List;

public interface TaskService {
    List<Task> getAllTasks();
}
