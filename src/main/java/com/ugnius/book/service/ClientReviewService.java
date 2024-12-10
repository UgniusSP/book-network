package com.ugnius.book.service;

import com.ugnius.book.dto.ReviewRequest;
import com.ugnius.book.dto.ReviewResponse;
import com.ugnius.book.model.Client;
import com.ugnius.book.model.ClientReview;
import com.ugnius.book.model.User;
import com.ugnius.book.repository.ClientReviewRepository;
import com.ugnius.book.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.ugnius.book.service.UserService.USER_NOT_FOUND;

@Service
@AllArgsConstructor
public class ClientReviewService {

    private final static String REVIEW_DOES_NOT_EXIST = "Review does not exist";
    private final ClientReviewRepository clientReviewRepository;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    public ReviewResponse addReview(ReviewRequest reviewRequest, String username) {
        var user = authenticationService.getAuthenticatedUser();

        haveClientAlreadyReviewed(username, user.getUsername());

        var review = ClientReview.builder()
                .text(reviewRequest.getText())
                .client((Client) getUser(username))
                .reviewer(user.getUsername())
                .build();

        clientReviewRepository.save(review);

        return ReviewResponse.builder()
                .reviewer(user.getUsername())
                .text(reviewRequest.getText())
                .build();
    }

    public void updateReview(ReviewRequest reviewRequest, Long id){
        var user = authenticationService.getAuthenticatedUser();

        var review = clientReviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(REVIEW_DOES_NOT_EXIST));

        validateOwnership(user, (ClientReview) review);

        review.setText(reviewRequest.getText());
        clientReviewRepository.save(review);
    }

    public void deleteReview(Long id){
        var user = authenticationService.getAuthenticatedUser();

        var review = clientReviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(REVIEW_DOES_NOT_EXIST));

        validateOwnership(user, (ClientReview) review);

        clientReviewRepository.delete(review);
    }

    public String getReview(Long id){
        return clientReviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(REVIEW_DOES_NOT_EXIST))
                .getText();
    }

    public List<ClientReview> getAllReviewsByClient(String username){
        return clientReviewRepository.findAllByClientUsername(username);
    }

    private void validateOwnership(User user, ClientReview review) {
        if(!review.getClient().getId().equals(user.getId())){
            throw new IllegalStateException("User is not the owner of the review");
        }
    }

    private User getUser(String username){
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND));
    }

    private void haveClientAlreadyReviewed(String username, String reviewer) {
        if (clientReviewRepository.findByClientUsernameAndReviewer(username, reviewer).isPresent()) {
            throw new IllegalStateException("Client has already reviewed");
        }
    }
}
