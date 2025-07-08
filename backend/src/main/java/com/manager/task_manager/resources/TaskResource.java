package com.manager.task_manager.resources;

import com.manager.task_manager.domains.Task;
import com.manager.task_manager.domains.User;
import com.manager.task_manager.services.interfaces.TaskService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/v1")
public class TaskResource {
    @Autowired
    TaskService taskService;

    @PostMapping("/add-task")
    public ResponseEntity<Map<String, Object>> addTask(HttpServletRequest request, @RequestBody Task task) {
        int id = (Integer) request.getAttribute("id");
        String role = (String) request.getAttribute("role");

        if(Objects.equals(role, "user")) {
            User createdByUser = new User();
            createdByUser.setId((long) id);
            task.setCreatedBy(createdByUser);
        }

        taskService.addNewTask(task);

        Map<String, Object> filteredTask = new HashMap<>();
        filteredTask.put("title", task.getTitle());
        filteredTask.put("description", task.getDescription());
        filteredTask.put("status", task.getStatus());
        filteredTask.put("priority", task.getPriority());
        filteredTask.put("due_date", task.getDue_date());

        Map<String, Object> response = new HashMap<>();
        response.put("task", filteredTask);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/update-task")
    public ResponseEntity<Map<String, Object>> addUser(HttpServletRequest request, @RequestBody Task task) {
        int id = (Integer) request.getAttribute("id");
        String role = (String) request.getAttribute("role");

        taskService.updateTask(task);

        Map<String, Object> filteredTask = new HashMap<>();
        filteredTask.put("title", task.getTitle());
        filteredTask.put("description", task.getDescription());
        filteredTask.put("status", task.getStatus());
        filteredTask.put("priority", task.getPriority());
        filteredTask.put("due_date", task.getDue_date());

        Map<String, Object> response = new HashMap<>();
        response.put("task", filteredTask);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
