package com.ugnius.book.dto;

import jakarta.annotation.Nullable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequest {

    private String text;

    @Nullable
    private Long parentReviewId;
}
