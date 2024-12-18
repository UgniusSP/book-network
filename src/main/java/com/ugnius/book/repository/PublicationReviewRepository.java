package com.ugnius.book.repository;

import com.ugnius.book.model.PublicationReview;
import com.ugnius.book.model.Review;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface PublicationReviewRepository extends JpaRepository<Review, Long> {
    @Transactional
    Optional<PublicationReview> findByPublicationIdAndReviewer(Long publicationId, String reviewer);

    @Transactional
    @Query("""
        SELECT r
        FROM PublicationReview r
        JOIN Publication p ON r.publication.id = p.id
        WHERE p.id = :publicationId
        """
    )
    List<PublicationReview> findAllByPublicationId(@NotNull @Param("publicationId") Long publicationId);


    @Transactional
    @Query("""
        SELECT r
        FROM PublicationReview r
        JOIN Publication p ON r.publication.id = p.id
        WHERE p.id = :publicationId AND r.parentReview IS NULL
        """
    )
    List<PublicationReview> findAllByPublicationIdAndParentReviewIsNull(Long publicationId);
}
