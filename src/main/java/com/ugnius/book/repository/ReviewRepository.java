package com.ugnius.book.repository;

import com.ugnius.book.model.Review;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByReviewer(String reviewer);

    @Query("""
            SELECT r
            FROM Review r
            JOIN Client c ON r.client.id = c.id
            WHERE c.username = :username
            """
    )
    List<Review> findAllByClientUsername(@NotNull @Param("username") String username);
}
