package com.ugnius.book.repository;

import com.ugnius.book.model.ClientReview;
import com.ugnius.book.model.PublicationReview;
import com.ugnius.book.model.Review;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ClientReviewRepository extends JpaRepository<Review, Long> {
    @Query("""
        SELECT r
        FROM ClientReview r
        JOIN Client c ON r.client.id = c.id
        WHERE c.username = :username AND r.reviewer = :reviewer
        """
    )
    Optional<PublicationReview> findByClientUsernameAndReviewer(@NotNull @Param("username") String username, @Param("reviewer") String reviewer);

    @Query("""
            SELECT r
            FROM ClientReview r
            JOIN Client c ON r.client.id = c.id
            WHERE c.username = :username
            """
    )
    List<ClientReview> findAllByClientUsername(@NotNull @Param("username") String username);
}
