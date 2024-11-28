package com.ugnius.book.dto;

import com.ugnius.book.enums.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class PublicationDto {
    private String title;
    private String author;
    private LocalDate publicationDate;
    private String language;
    private PublicationType publicationType;
    private String isbn;
    private String genre;
    private int pageCount;
    private String format;
    private String summary;
    private String frequency;
    private byte[] image;
}
