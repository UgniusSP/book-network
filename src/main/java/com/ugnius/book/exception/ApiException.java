package com.ugnius.book.exception;

import org.springframework.http.HttpStatus;

public interface ApiException {
    default HttpStatus getStatus() {
        return HttpStatus.BAD_REQUEST;
    }
}
