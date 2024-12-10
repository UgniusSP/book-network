package com.ugnius.book.repository.specification;

import com.ugnius.book.model.Publication;
import org.springframework.data.jpa.domain.Specification;

public class BookSpecification {

    public static Specification<Publication> hasGenre(String genre) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("genre"), genre);
    }

    public static Specification<Publication> hasLanguage(String language) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("language"), language);
    }
}