package com.ugnius.book.model;

import com.ugnius.book.enums.Format;
import com.ugnius.book.enums.Genre;
import com.ugnius.book.enums.Language;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class Book extends Publication {
    private String publisher;
    private String isbn;
    private Genre genre;
    private int pageCount;
    private Language language;
    private int publicationYear;
    private Format format;
    private String summary;

}
