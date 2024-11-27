package com.ugnius.book.controller;

import com.ugnius.book.dto.ReviewDto;
import com.ugnius.book.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
@AllArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/{id}")
    public ResponseEntity<String> getReview(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.getReview(id));
    }

    @PostMapping("/add/{username}")
    public ResponseEntity<String> addReview(@RequestBody ReviewDto reviewDto,
                                            @PathVariable String username) {
        reviewService.addReview(reviewDto, username);
        return ResponseEntity.ok("Review added successfully");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateReview(@RequestBody ReviewDto reviewDto,
                                               @PathVariable Long id) {
        reviewService.updateReview(reviewDto, id);
        return ResponseEntity.ok("Review updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok("Review deleted successfully");
    }

}
