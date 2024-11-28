package com.ugnius.book.dto;

import com.ugnius.book.enums.UserType;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class RegisterRequest {
    @NotNull
    private String username;
    @NotNull
    private String password;
    @NotNull
    private String name;
    @NotNull
    private String surname;
    @NotNull
    private String address;
    @NotNull
    private LocalDate birthdate;
    @NotNull
    private String phoneNum;
    private UserType userType;
}