package com.manager.task_manager.resources;

import com.manager.task_manager.domains.Task;
import com.manager.task_manager.domains.User;
import com.manager.task_manager.domains.dto.TaskDto;
import com.manager.task_manager.domains.enums.TaskStatus;
import com.manager.task_manager.exceptions.EtBadRequestException;
import com.manager.task_manager.services.interfaces.TaskService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1")
public class TaskResource {
    @Autowired
    TaskService taskService;

    @PostMapping("/add-task")
    public ResponseEntity<Map<String, Object>> addTask(HttpServletRequest request, @RequestBody Task task) {
        int id = (Integer) request.getAttribute("id");
        String role = (String) request.getAttribute("role");

        User createdBy = new User();
        createdBy.setId((long) id);
        task.setCreatedBy(createdBy);

        if ("user".equalsIgnoreCase(role)) {
            User assignedTo = new User();
            assignedTo.setId((long) id);
            task.setAssignedTo(assignedTo);
        } else {
            if (task.getAssignedTo().getId() == null) {
                throw new IllegalArgumentException("assigned to id is required");
            }

            User assignedTo = new User();
            assignedTo.setId(task.getAssignedTo().getId());
            task.setAssignedTo(assignedTo);
        }

        taskService.addNewTask(task);

        Map<String, Object> filteredTask = new HashMap<>();
        filteredTask.put("title", task.getTitle());
        filteredTask.put("description", task.getDescription());
        filteredTask.put("status", task.getStatus());
        filteredTask.put("priority", task.getPriority());
        filteredTask.put("due_date", task.getDueDate());

        Map<String, Object> response = new HashMap<>();
        response.put("task", filteredTask);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/update-task/{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long id, @RequestBody TaskDto taskDto) {
        try {
            TaskDto updatedTask = taskService.updateTask(id, taskDto);
            return ResponseEntity.ok(updatedTask);
        } catch (EtBadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/my-tasks")
    public ResponseEntity<List<TaskDto>> getMyTasks(HttpServletRequest request) {
        int id = (Integer) request.getAttribute("id");
        List<TaskDto> tasks = taskService.fndMyTasks((long) id);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/task-count/{status}")
    public ResponseEntity<Map<String, Long>> getTaskCountByStatus(HttpServletRequest request, @PathVariable("status") String status) {
        int id = (Integer) request.getAttribute("id");
        long count = taskService.countMineByStatus(TaskStatus.valueOf(status), (long) id);
        Map<String, Long> response = new HashMap<>();
        response.put(status, count);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
