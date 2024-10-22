package com.ugnius.book.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class Client extends User {
    private String address;
    private LocalDate birthdate;

    @OneToMany(mappedBy = "client")
    private List<Publication> ownedPublications;

    @OneToMany(mappedBy = "borrower")
    private List<Publication> borrowedPublications;
}
