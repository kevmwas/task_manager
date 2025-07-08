package com.manager.task_manager.services.implementations;

import com.manager.task_manager.domains.Task;
import com.manager.task_manager.domains.User;
import com.manager.task_manager.exceptions.EtBadRequestException;
import com.manager.task_manager.exceptions.EtResourceNotFoundException;
import com.manager.task_manager.repositories.TaskRepository;
import com.manager.task_manager.services.interfaces.TaskService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class TaskServiceImpl implements TaskService {
   @Autowired
   TaskRepository taskRepository;

    @Override
    public List<Task> fndMyTasks(Long assigned_to) throws EtBadRequestException {
        try {
            return taskRepository.findAllByAssigned_to(assigned_to);
        } catch (Exception error) {
            throw new EtResourceNotFoundException("Invalid details. Failed to find my tasks");
        }
    }

    @Override
    public Task addNewTask(Task task) throws EtBadRequestException {
        try {
            task.setUpdated_at(java.time.LocalDateTime.now());
            task.setCreated_at(java.time.LocalDateTime.now());

            return taskRepository.save(task);
        } catch (Exception error) {
            System.out.println("the error is here" + error);
            throw new EtBadRequestException("Invalid details. Failed to create new user");
        }
    }

    @Override
    public Task updateTask(Task task) throws EtBadRequestException {
        return null;
    }

    @Override
    public long countByStatus(String status) throws EtBadRequestException {
        return 0;
    }

        /*
    @Override
    public Task getTaskById(String id) {
        return taskRepository.findById(id)
                             .orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + id));
    }

    @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(String id, Task taskDetails) {
        Task task = taskRepository.findById(id)
                                 .orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + id));

        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setDueDate(taskDetails.getDueDate());
        task.setStatus(taskDetails.getStatus());
        task.setPriority(taskDetails.getPriority());
        task.setAssignedTo(taskDetails.getAssignedTo());
        // createdAt is not updated
        task.setUpdatedAt(LocalDateTime.now()); // Ensure updatedAt is updated on every modification

        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(String id) {
        Task task = taskRepository.findById(id)
                                 .orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + id));
        taskRepository.delete(task);
    }
    */
}
