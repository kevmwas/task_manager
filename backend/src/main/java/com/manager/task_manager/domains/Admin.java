package com.manager.task_manager.domains;

import com.manager.task_manager.domains.enums.AdminRoles;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.sql.Blob;
import java.time.LocalDateTime;

@Entity
@Table(name = "admins")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank(message = "First name cannot be blank")
    private String first_name;

    @NotNull
    @NotBlank(message = "Last name cannot be blank")
    private String last_name;

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

    @Column(nullable = true)
    private String id_no;

    @Column(nullable = true, columnDefinition = "TEXT")
    private String bio;

    @Column(nullable = true)
    private AdminRoles role;

    @Column(nullable = true)
    private String gender;

    @Column(nullable = true)
    private String dob;

    @Column(nullable = true)
    private String country;

    @Column(nullable = true)
    private String county;

    @Column(nullable = true)
    private String location;

    @Column(nullable = true)
    private String city;

    @Column(nullable = true)
    private String otp_code;

    @Column(nullable = true)
    private String otp_expiration;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean is_active;

    @Column(nullable = true, columnDefinition = "varchar(500) DEFAULT 'default.jpg'")
    private String profile;

    @Column(nullable = true, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime created_at;

    @Column(nullable = true, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime updated_at;

    public Admin(Long id, String first_name, String last_name, String email, String password, String phone, String id_no, String bio,
                 String gender, String dob, String country, String county, String location, String city,
                 String otp_code, String otp_expiration, boolean is_active, String profile, LocalDateTime created_at, LocalDateTime updated_at) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.id_no = id_no;
        this.bio = bio;
        this.role = AdminRoles.admin;
        this.gender = gender;
        this.dob = dob;
        this.country = country;
        this.county = county;
        this.location = location;
        this.city = city;
        this.otp_code = otp_code;
        this.otp_expiration = otp_expiration;
        this.is_active = is_active;
        this.profile = profile;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    public Admin() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getId_no() {
        return id_no;
    }

    public void setId_no(String id_no) {
        this.id_no = id_no;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public AdminRoles getRole() {
        return role;
    }

    public void setRole(AdminRoles role) {
        this.role = role;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getOtp_code() {
        return otp_code;
    }

    public void setOtp_code(String otp_code) {
        this.otp_code = otp_code;
    }

    public String getOtp_expiration() {
        return otp_expiration;
    }

    public void setOtp_expiration(String otp_expiration) {
        this.otp_expiration = otp_expiration;
    }

    public boolean isIs_active() {
        return is_active;
    }

    public void setIs_active(boolean is_active) {
        this.is_active = is_active;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public LocalDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }
}