package com.ugnius.book.exception;

public class AuthenticationException extends RuntimeException implements ApiException {
    private static final String MESSAGE = "User is not authenticated.";
    public AuthenticationException() {
        super(MESSAGE);
    }
}
