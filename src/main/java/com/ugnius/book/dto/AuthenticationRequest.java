package com.ugnius.book.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticationRequest {

    @NotBlank(message = "Username is mandatory")
    @NotNull
    private String username;

    @NotBlank(message = "Password is mandatory")
    @NotNull
    private String password;
}