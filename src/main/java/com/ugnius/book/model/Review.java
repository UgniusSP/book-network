package com.ugnius.book.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
    protected String text;
    protected String reviewer;

    @ManyToOne
    @JoinColumn(name = "parent_review_id")
    @JsonBackReference
    protected Review parentReview;

    @OneToMany(mappedBy = "parentReview", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    protected List<Review> replies;
}
