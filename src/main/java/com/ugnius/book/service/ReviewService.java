package com.ugnius.book.service;

import com.ugnius.book.dto.ReviewDto;
import com.ugnius.book.model.Client;
import com.ugnius.book.model.Review;
import com.ugnius.book.model.User;
import com.ugnius.book.repository.ReviewRepository;
import com.ugnius.book.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import static com.ugnius.book.service.UserService.*;

@Service
@AllArgsConstructor
public class ReviewService {

    private final static String REVIEW_DOES_NOT_EXIST = "Review does not exist";
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public void addReview(ReviewDto reviewDto, String username, String authorizationHeader) {
        String reviewer = getUsernameFromToken(authorizationHeader);

        var review = Review.builder()
                .text(reviewDto.getReviewText())
                .client((Client) getUser(username))
                .reviewer(reviewer)
                .build();

        reviewRepository.save(review);
    }

    public void updateReview(ReviewDto reviewDto, Long id){
        var review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(REVIEW_DOES_NOT_EXIST));

        review.setText(reviewDto.getReviewText());
        reviewRepository.save(review);
    }

    public void deleteReview(Long id){
        var review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(REVIEW_DOES_NOT_EXIST));

        reviewRepository.delete(review);
    }

    public String getReview(Long id){
        return reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(REVIEW_DOES_NOT_EXIST))
                .getText();
    }

    private User getUser(String username){
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND));
    }

    private String getUsernameFromToken(String authorizationHeader){
        String token = authorizationHeader.substring(7);
        return jwtService.extractUsername(token);
    }
}
