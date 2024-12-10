package com.ugnius.book.controller;

import com.ugnius.book.dto.ReviewRequest;
import com.ugnius.book.dto.ReviewResponse;
import com.ugnius.book.model.ClientReview;
import com.ugnius.book.service.ClientReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/client-review")
@AllArgsConstructor
public class ClientReviewController {

    private final ClientReviewService clientReviewService;

    @GetMapping("/{id}")
    public ResponseEntity<String> getReview(@PathVariable Long id) {
        return ResponseEntity.ok(clientReviewService.getReview(id));
    }

    @PostMapping("/add/{username}")
    public ResponseEntity<ReviewResponse> addReview(@RequestBody ReviewRequest reviewRequest,
                                                    @PathVariable String username) {
        var response = clientReviewService.addReview(reviewRequest, username);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateReview(@RequestBody ReviewRequest reviewRequest,
                                               @PathVariable Long id) {
        clientReviewService.updateReview(reviewRequest, id);
        return ResponseEntity.ok("Review updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {
        clientReviewService.deleteReview(id);
        return ResponseEntity.ok("Review deleted successfully");
    }

    @GetMapping("/{username}/all")
    public ResponseEntity<List<ClientReview>> getAllReviewsByClient(@PathVariable String username) {
        return ResponseEntity.ok(clientReviewService.getAllReviewsByClient(username));
    }

}
