package com.manager.task_manager.domains.dto;

import com.manager.task_manager.domains.enums.UserRoles;
import jakarta.validation.constraints.Email;

public class UserUpdateDto {
    private String first_name;

    private String last_name;

    @Email(message = "Email should be valid")
    private String email;

    private String phone;

    private String id_no;

    private String bio;

    private String gender;
    private String dob;

    private String country;
    private String county;
    private String location;
    private String city;

    private String profile;

    private UserRoles role;
    private Boolean is_active;

    public UserUpdateDto() {
    }

    public UserUpdateDto(String first_name, String last_name, String email, String phone,
                         String id_no, String bio, String gender, String dob,
                         String country, String county, String location, String city,
                         String profile, Boolean is_active) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
        this.id_no = id_no;
        this.bio = bio;
        this.gender = gender;
        this.dob = dob;
        this.country = country;
        this.county = county;
        this.location = location;
        this.city = city;
        this.profile = profile;
        this.role = UserRoles.user;
        this.is_active = is_active;
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

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public UserRoles getRole() {
        return role;
    }

    public void setRole(UserRoles role) {
        this.role = role;
    }

    public Boolean getIs_active() {
        return is_active;
    }

    public void setIs_active(Boolean is_active) {
        this.is_active = is_active;
    }
}
