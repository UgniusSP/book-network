package com.ugnius.book.dto;

import com.ugnius.book.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    private String username;
    private String password;
    private String name;
    private String surname;
    private String address;
    private LocalDate birthdate;
    private String phoneNum;
    private UserType userType;
}