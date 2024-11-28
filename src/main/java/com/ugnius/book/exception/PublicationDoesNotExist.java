package com.ugnius.book.exception;

public class PublicationDoesNotExist extends RuntimeException implements ApiException {
    private static final String MESSAGE = "Publication does not exist.";
    public PublicationDoesNotExist() {
        super(MESSAGE);
    }
}
