package com.ugnius.book.dto;

import com.ugnius.book.enums.UserType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class RegisterRequest {
    private String username;
    private String password;
    private String name;
    private String surname;
    private String address;
    private LocalDate birthdate;
    private String phoneNum;
    private UserType userType;
}