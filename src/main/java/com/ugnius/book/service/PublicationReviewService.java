package com.ugnius.book.service;

import com.ugnius.book.dto.ReviewRequest;
import com.ugnius.book.dto.ReviewResponse;
import com.ugnius.book.model.Publication;
import com.ugnius.book.model.PublicationReview;
import com.ugnius.book.repository.PublicationRepository;
import com.ugnius.book.repository.PublicationReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PublicationReviewService {
    private final PublicationReviewRepository publicationReviewRepository;
    private final PublicationRepository publicationRepository;

    private final AuthenticationService authenticationService;

    public ReviewResponse addReview(ReviewRequest reviewRequest, Long publicationId) {
        var user = authenticationService.getAuthenticatedUser();
        var publication = getPublication(publicationId);

        haveClientAlreadyReviewed(publicationId, user.getUsername());

        var review = PublicationReview.builder()
                .text(reviewRequest.getText())
                .publication(publication)
                .reviewer(user.getUsername())
                .build();

        publicationReviewRepository.save(review);

        return ReviewResponse.builder()
                .reviewer(user.getUsername())
                .text(reviewRequest.getText())
                .build();
    }

    public List<PublicationReview> getAllReviewsByPublication(Long publicationId) {
        return publicationReviewRepository.findAllByPublicationId(publicationId);
    }

    private void haveClientAlreadyReviewed(Long publicationId, String username) {
        if (publicationReviewRepository.findByPublicationIdAndReviewer(publicationId, username).isPresent()) {
            throw new IllegalStateException("Client has already reviewed");
        }
    }

    private Publication getPublication(Long publicationId) {
        return publicationRepository.findById(publicationId)
                .orElseThrow(() -> new IllegalArgumentException("Publication not found"));
    }
}
