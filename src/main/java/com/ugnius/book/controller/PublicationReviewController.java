package com.ugnius.book.controller;

import com.ugnius.book.dto.ReviewRequest;
import com.ugnius.book.dto.ReviewResponse;
import com.ugnius.book.model.PublicationReview;
import com.ugnius.book.service.PublicationReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publication-review")
@AllArgsConstructor
public class PublicationReviewController {

    private final PublicationReviewService publicationReviewService;

    @PostMapping("/add/{publicationId}")
    public ResponseEntity<ReviewResponse> addReview(@RequestBody ReviewRequest reviewRequest,
                                                    @PathVariable Long publicationId) {
        var response = publicationReviewService.addReview(reviewRequest, publicationId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{id}/all")
    public ResponseEntity<List<PublicationReview>> getAllReviewsByPublication(@PathVariable Long id) {
        return ResponseEntity.ok(publicationReviewService.getAllReviewsByPublication(id));
    }

}
