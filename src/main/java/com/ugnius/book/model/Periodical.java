package com.ugnius.book.model;

import com.ugnius.book.enums.Frequency;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class Periodical extends Publication {
    private int issueNumber;
    private LocalDate publicationDate;
    private String editor;
    private Frequency frequency;
    private String publisher;
}
