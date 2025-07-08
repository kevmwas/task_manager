package com.manager.task_manager.services.interfaces;

import com.manager.task_manager.domains.Task;
import com.manager.task_manager.exceptions.EtBadRequestException;

import java.util.List;

public interface TaskService {

    List<Task> fndMyTasks(Long assigned_to) throws EtBadRequestException;

    Task addNewTask(Task task) throws EtBadRequestException;

    Task updateTask(Task task) throws EtBadRequestException;
    long countByStatus(String status) throws EtBadRequestException;
}
