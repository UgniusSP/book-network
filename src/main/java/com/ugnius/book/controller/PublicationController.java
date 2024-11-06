package com.ugnius.book.controller;

import com.ugnius.book.dto.PublicationDto;
import com.ugnius.book.model.Publication;
import com.ugnius.book.service.PublicationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publications")
@AllArgsConstructor
public class PublicationController {

    private final PublicationService publicationService;

    @PostMapping("/add")
    public ResponseEntity<String> addPublication(@RequestBody PublicationDto publicationDto,
                                                 @RequestHeader ("Authorization") String authorizationHeader) {
        try {
            publicationService.addPublication(publicationDto, authorizationHeader);
            return new ResponseEntity<>("Publication created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<Publication>> getAllPublications() {
        List<Publication> publications = publicationService.getAllPublications();
        return new ResponseEntity<>(publications, HttpStatus.OK);
    }

    @GetMapping("/{title}")
    public ResponseEntity<Publication> getPublication(@PathVariable String title) {
        Publication publication = publicationService.getPublication(title);
        return new ResponseEntity<>(publication, HttpStatus.OK);
    }

    @PutMapping("/{title}")
    public ResponseEntity<String> updatePublication(@PathVariable String title, @RequestBody PublicationDto publicationDto) {
        try {
            publicationService.updatePublication(title, publicationDto);
            return new ResponseEntity<>("Publication updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{title}")
    public ResponseEntity<String> deletePublication(@PathVariable String title) {
        try {
            publicationService.deletePublication(title);
            return new ResponseEntity<>("Publication deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/borrow/{id}")
    public ResponseEntity<String> borrowPublication(@PathVariable Long id, @RequestHeader("Authorization") String authorizationHeader) {
        try {
            publicationService.borrowPublication(id, authorizationHeader);
            return new ResponseEntity<>("Publication borrowed successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/return/{id}")
    public ResponseEntity<String> returnPublication(@PathVariable Long id) {
        try {
            publicationService.returnPublication(id);
            return new ResponseEntity<>("Publication returned successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getPublicationsCount() {
        return new ResponseEntity<>(publicationService.getPublicationCount(), HttpStatus.OK);
    }


}
