package com.ugnius.book.dto;

import com.ugnius.book.enums.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PublicationDto {
    private PublicationType publicationType;
    private String title;
    private String author;
    private String publisher;
    private String isbn;
    private Genre genre;
    private int pageCount;
    private Language language;
    private int publicationYear;
    private Format format;
    private String summary;
    private int issueNumber;
    private LocalDate publicationDate;
    private String editor;
    private Frequency frequency;
}
