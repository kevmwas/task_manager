package com.manager.task_manager.services.interfaces;

import com.manager.task_manager.domains.Task;
import com.manager.task_manager.domains.dto.TaskDto;
import com.manager.task_manager.domains.enums.TaskStatus;
import com.manager.task_manager.exceptions.EtBadRequestException;

import java.util.List;

public interface TaskService {
    List<TaskDto> fndMyTasks(Long assigned_to) throws EtBadRequestException;
    Task addNewTask(Task task) throws EtBadRequestException;
    long countMineByStatus(TaskStatus status, Long assignedToId) throws EtBadRequestException;
    TaskDto updateTask(Long id, TaskDto taskDto) throws EtBadRequestException;
    void deleteTask(Long id) throws EtBadRequestException;
}
