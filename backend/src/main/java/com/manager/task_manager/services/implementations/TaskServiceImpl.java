package com.manager.task_manager.services.implementations;

import com.manager.task_manager.domains.Task;
import com.manager.task_manager.domains.User;
import com.manager.task_manager.domains.dto.TaskDto;
import com.manager.task_manager.domains.dto.UserDto;
import com.manager.task_manager.domains.enums.TaskStatus;
import com.manager.task_manager.exceptions.EtBadRequestException;
import com.manager.task_manager.exceptions.EtResourceNotFoundException;
import com.manager.task_manager.repositories.TaskRepository;
import com.manager.task_manager.repositories.UserRepository;
import com.manager.task_manager.services.interfaces.TaskService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {
    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserRepository userRepository;

    private UserDto convertUserToDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user.getId(), user.getFirst_name(), user.getLast_name(), user.getEmail());
    }

    private TaskDto convertToDto(Task task) {
        UserDto createdByDto = convertUserToDto(task.getCreatedBy());
        UserDto assignedToDto = convertUserToDto(task.getAssignedTo());

        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                createdByDto,
                assignedToDto,
                task.getCreatedAt(),
                task.getUpdatedAt(),
                task.getStatus(),
                task.getPriority()
        );
    }

    @Override
    public List<TaskDto> fndMyTasks(Long assigned_to) throws EtBadRequestException {
        try {
            return taskRepository.findByAssignedTo_IdOrderByUpdatedAtDesc(assigned_to).stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        } catch (Exception error) {
            throw new EtBadRequestException("Invalid details. Failed to find my tasks");
        }
    }

    @Override
    public Task addNewTask(Task task) throws EtBadRequestException {
        try {
            task.setUpdatedAt(java.time.LocalDateTime.now());
            task.setCreatedAt(java.time.LocalDateTime.now());

            return taskRepository.save(task);
        } catch (Exception error) {
            throw new EtBadRequestException("Invalid details. Failed to create new task");
        }
    }

    @Override
    public long countMineByStatus(TaskStatus status, Long assignedToId) throws EtBadRequestException {
        try {
            return taskRepository.countTaskByStatusAndAssignedTo_Id(status, assignedToId);
        } catch (Exception error) {
            System.out.println("the error is here" + error);
            throw new EtBadRequestException("Invalid details. Failed to get task count");
        }
    }

    @Override
    public TaskDto updateTask(Long id, TaskDto taskDto) throws EtBadRequestException {
        try {
            Task existingTask = taskRepository.findById(id);
            if (existingTask == null) throw new EtResourceNotFoundException("Task not found");

            Optional.ofNullable(taskDto.getTitle()).ifPresent(existingTask::setTitle);
            Optional.ofNullable(taskDto.getDescription()).ifPresent(existingTask::setDescription);
            Optional.ofNullable(taskDto.getDueDate()).ifPresent(existingTask::setDueDate);
            Optional.ofNullable(taskDto.getStatus()).ifPresent(existingTask::setStatus);
            Optional.ofNullable(taskDto.getPriority()).ifPresent(existingTask::setPriority);

            if (taskDto.getAssignedTo() != null && taskDto.getAssignedTo().getId() != null) {
                User assignedUser = userRepository.findById(taskDto.getAssignedTo().getId());
                if (assignedUser == null) {
                    throw new EtBadRequestException("Assigned user not found");
                }
                existingTask.setAssignedTo(assignedUser);
            }

            existingTask.setUpdatedAt(LocalDateTime.now());

            Task updatedTask = taskRepository.save(existingTask);
            return convertToDto(updatedTask);
        } catch (Exception error) {
            throw new EtBadRequestException("Error updating task");
        }
    }

    @Override
    public void deleteTask(Long id) throws EtBadRequestException {
    }
}

//    @Override
//    public long countByStatus(String status) throws EtBadRequestException {
//        try {
//            return taskRepository.countTaskByStatus(TaskStatus.valueOf(status));
//        } catch (Exception error) {
//            System.out.println("the error is here" + error);
//            throw new EtBadRequestException("Invalid details. Failed to get task count");
//        }
//    }

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
