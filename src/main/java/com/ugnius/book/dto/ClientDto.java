package com.ugnius.book.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ClientDto {
    private String username;
    private String firstName;
    private String lastName;
    private String address;
    private LocalDate birthdate;

}
