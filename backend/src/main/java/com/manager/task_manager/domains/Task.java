package com.manager.task_manager.domains;

import com.manager.task_manager.domains.enums.TaskPriority;
import com.manager.task_manager.domains.enums.TaskStatus;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.sql.Blob;
import java.time.LocalDateTime;

public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank(message = "title cannot be blank")
    private String tile;

    private String description;

    private TaskStatus status;

    private TaskPriority priority;

    private String due_date;

    private Long createdBy;

    private Long assigned_to;

    @NotNull
    @NotBlank(message = "Email cannot be blank")
    @Column(nullable = false, unique = true)
    private String email;

    @NotNull
    @NotBlank(message = "password cannot be blank")
    private String password;

    @NotNull
    @NotBlank(message = "Phone cannot be blank")
    @Column(nullable = false, unique = true)
    private String phone;

    @NotNull
    @NotBlank(message = "Id no cannot be blank")
    @Column(nullable = false, unique = true)
    private String id_no;

    @Column(nullable = true)
    private Blob bio;

    @Column(nullable = true)
    private String role;

    @Column(nullable = true)
    private String gender;

    @Column(nullable = true)
    private String country;

    @Column(nullable = true)
    private String county;

    @Column(nullable = true)
    private String location;

    @Column(nullable = true)
    private String city;

    @Column(nullable = true)
    private String next_of_kin;

    @Column(nullable = true)
    private String next_of_kin_contact;

    @Column(nullable = true)
    private String otp_code;

    @Column(nullable = true)
    private String otp_expiration;

    @Column(nullable = false, columnDefinition = "boolean DEFAULT true")
    private boolean is_active;

    @Column(nullable = false, columnDefinition = "boolean DEFAULT false")
    private boolean is_blocked;

    @Column(nullable = true, columnDefinition = "varchar(500) DEFAULT 'default.jpg'")
    private String profile;

    @Column(nullable = true, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime created_at;

    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updated_at;
}
