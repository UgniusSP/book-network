package com.ugnius.book.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity
@Table(name = "publications")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class Publication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
    protected String title;
    protected String author;
    protected LocalDate publicationDate;
    protected String language;
    protected String publicationType;
    protected boolean isAvailable;

    @ManyToOne
    @JsonIgnore
    protected Client client;

    @ManyToOne
    @JsonIgnore
    protected Client borrower;
}
