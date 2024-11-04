package com.ugnius.book.repository;

import com.ugnius.book.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByReviewer(String reviewer);
}
