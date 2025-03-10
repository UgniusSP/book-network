package com.ugnius.book.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
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
    private String summary;
    protected String publicationType;
    protected boolean isAvailable;

    @ManyToOne
    @JsonIgnore
    protected Client client;

    @ManyToOne
    @JsonIgnore
    protected Client borrower;

    @OneToMany(mappedBy = "publication", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<PublicationReview> reviews;

    @Lob
    protected byte[] image;
}
