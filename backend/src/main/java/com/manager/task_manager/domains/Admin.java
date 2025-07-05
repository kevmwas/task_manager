package com.manager.task_manager.domains;

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

    public Admin(Long id, String first_name, String last_name, String email, String password, String phone, String id_no, Blob bio,
                 String role, String gender, String dob, String country, String county, String location, String city,
                 String next_of_kin, String next_of_kin_contact, String otp_code, String otp_expiration, boolean is_active,
                 boolean is_blocked, int rating, String profile, LocalDateTime created_at, LocalDateTime updated_at) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.id_no = id_no;
        this.bio = bio;
        this.role = role;
        this.gender = gender;
        this.country = country;
        this.county = county;
        this.location = location;
        this.city = city;
        this.next_of_kin = next_of_kin;
        this.next_of_kin_contact = next_of_kin_contact;
        this.otp_code = otp_code;
        this.otp_expiration = otp_expiration;
        this.is_active = is_active;
        this.is_blocked = is_blocked;
        this.profile = profile;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

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

    public Blob getBio() {
        return bio;
    }

    public void setBio(Blob bio) {
        this.bio = bio;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
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

    public String getNext_of_kin() {
        return next_of_kin;
    }

    public void setNext_of_kin(String next_of_kin) {
        this.next_of_kin = next_of_kin;
    }

    public String getNext_of_kin_contact() {
        return next_of_kin_contact;
    }

    public void setNext_of_kin_contact(String next_of_kin_contact) {
        this.next_of_kin_contact = next_of_kin_contact;
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

    public boolean isIs_blocked() {
        return is_blocked;
    }

    public void setIs_blocked(boolean is_blocked) {
        this.is_blocked = is_blocked;
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