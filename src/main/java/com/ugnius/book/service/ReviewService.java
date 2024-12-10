package com.ugnius.book.service;

import com.ugnius.book.dto.ReviewDto;
import com.ugnius.book.model.Client;
import com.ugnius.book.model.Review;
import com.ugnius.book.model.User;
import com.ugnius.book.repository.ReviewRepository;
import com.ugnius.book.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import static com.ugnius.book.service.ClientService.USER_NOT_FOUND;

@Service
@AllArgsConstructor
public class ReviewService {

    private final static String REVIEW_DOES_NOT_EXIST = "Review does not exist";
    private final ReviewRepository reviewRepository;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    public void addReview(ReviewDto reviewDto, String username) {
        var user = authenticationService.getAuthenticatedUser();

        var review = Review.builder()
                .text(reviewDto.getReviewText())
                .client((Client) getUser(username))
                .reviewer(user.getUsername())
                .build();

        reviewRepository.save(review);
    }

    public void updateReview(ReviewDto reviewDto, Long id){
        var user = authenticationService.getAuthenticatedUser();

        var review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(REVIEW_DOES_NOT_EXIST));

        validateOwnership(user, review);

        review.setText(reviewDto.getReviewText());
        reviewRepository.save(review);
    }

    public void deleteReview(Long id){
        var user = authenticationService.getAuthenticatedUser();

        var review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(REVIEW_DOES_NOT_EXIST));

        validateOwnership(user, review);

        reviewRepository.delete(review);
    }

    public String getReview(Long id){
        return reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(REVIEW_DOES_NOT_EXIST))
                .getText();
    }

    private void validateOwnership(User user, Review review) {
        if(!review.getClient().getId().equals(user.getId())){
            throw new IllegalStateException("User is not the owner of the review");
        }
    }

    private User getUser(String username){
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND));
    }
}
