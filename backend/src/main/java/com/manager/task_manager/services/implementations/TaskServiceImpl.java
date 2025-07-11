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
                task.getCreated_at(),
                task.getUpdated_at(),
                task.getStatus(),
                task.getPriority()
        );
    }

    @Override
    public List<TaskDto> fndMyTasks(Long assigned_to) throws EtBadRequestException {
        try {
            return taskRepository.findByAssignedTo_Id(assigned_to).stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        } catch (Exception error) {
            throw new EtBadRequestException("Invalid details. Failed to find my tasks");
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
        Task existingTask = taskRepository.findById(id);
        if(existingTask == null) throw new EtResourceNotFoundException("Task not found");

        if (taskDto.getTitle() != null) existingTask.setTitle(taskDto.getTitle());

        if (taskDto.getDescription() != null) existingTask.setDescription(taskDto.getDescription());

        if (taskDto.getDueDate() != null) existingTask.setDueDate(taskDto.getDueDate());

        if (taskDto.getStatus() != null) existingTask.setStatus(taskDto.getStatus());

        if (taskDto.getPriority() != null) existingTask.setPriority(taskDto.getPriority());

        if (taskDto.getAssignedTo() != null) {
            Long assignedToId = taskDto.getAssignedTo().getId();
            if (assignedToId != null) {
                User assignedUser = userRepository.findById(assignedToId);
                if (assignedUser != null) {
                    existingTask.setAssignedTo(assignedUser);
                } else {
                    throw new EtBadRequestException("Assigned user not found");
                }
            }
        }

        existingTask.setUpdated_at(LocalDateTime.now());

        Task updatedTask = taskRepository.save(existingTask);
        return convertToDto(updatedTask);
    }

    @Override
    public void deleteTask(Long id) throws EtBadRequestException {

    }

//    @Override
//    public long countByStatus(String status) throws EtBadRequestException {
//        try {
//            return taskRepository.countTaskByStatus(TaskStatus.valueOf(status));
//        } catch (Exception error) {
//            System.out.println("the error is here" + error);
//            throw new EtBadRequestException("Invalid details. Failed to get task count");
//        }
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
