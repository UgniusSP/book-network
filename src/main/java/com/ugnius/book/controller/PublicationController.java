package com.ugnius.book.controller;

import com.ugnius.book.dto.PublicationDto;
import com.ugnius.book.enums.PublicationType;
import com.ugnius.book.model.Publication;
import com.ugnius.book.service.PublicationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/publications")
@AllArgsConstructor
public class PublicationController {

    private final PublicationService publicationService;

    @PostMapping("/add")
    public ResponseEntity<Publication> addPublication(
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("publicationDate") LocalDate year,
            @RequestParam("language") String language,
            @RequestParam("summary") String summary,
            @RequestParam("image") MultipartFile image,
            @RequestParam("publicationType") String type,
            @RequestParam(value = "isbn", required = false) String isbn,
            @RequestParam(value = "genre", required = false) String genre,
            @RequestParam(value = "pageCount", required = false) Integer pageCount,
            @RequestParam(value = "format", required = false) String format,
            @RequestParam(value = "frequency", required = false) String frequency) {
        try {
            var publicationDto = PublicationDto.builder()
                    .title(title)
                    .author(author)
                    .publicationDate(year)
                    .language(language)
                    .publicationType(PublicationType.valueOf(type))
                    .isbn(isbn)
                    .genre(genre)
                    .pageCount(pageCount)
                    .format(format)
                    .summary(summary)
                    .frequency(frequency)
                    .image(image.getBytes())
                    .build();

            var response = publicationService.addPublication(publicationDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Publication>> getAllPublications() {
        List<Publication> publications = publicationService.getAllPublications();
        return new ResponseEntity<>(publications, HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Publication>> getFilteredPublications(
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String language) {
        if (genre == null && language == null) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
        List<Publication> publications = publicationService.getFilteredPublications(genre, language);
        return new ResponseEntity<>(publications, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Publication> getPublication(@PathVariable Long id) {
        Publication publication = publicationService.getPublication(id);
        return new ResponseEntity<>(publication, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Publication> updatePublication(
            @PathVariable Long id,
            @RequestParam("type") String type,
            @RequestParam("isbn") String isbn,
            @RequestParam("genre") String genre,
            @RequestParam("pageCount") Integer pageCount,
            @RequestParam("format") String format,
            @RequestParam("summary") String summary,
            @RequestParam("frequency") String frequency,
            @RequestParam("image") MultipartFile image) {
        try {
            var publicationDto = PublicationDto.builder()
                    .publicationType(PublicationType.valueOf(type))
                    .isbn(isbn)
                    .genre(genre)
                    .pageCount(pageCount)
                    .format(format)
                    .summary(summary)
                    .frequency(frequency)
                    .image(image.getBytes())
                    .build();

            var response = publicationService.updatePublication(id, publicationDto);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePublication(@PathVariable Long id) {
        try {
            publicationService.deletePublication(id);
            return new ResponseEntity<>("Publication deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/borrow")
    public ResponseEntity<String> borrowPublication(@PathVariable Long id) {
        try {
            publicationService.borrowPublication(id);
            return new ResponseEntity<>("Publication borrowed successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}/return")
    public ResponseEntity<String> returnPublication(@PathVariable Long id) {
        try {
            publicationService.returnPublication(id);
            return new ResponseEntity<>("Publication returned successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}/owner")
    public ResponseEntity<String> getOwner(@PathVariable Long id) {
        var owner = publicationService.getOwnerUsernameByPublication(id);
        return ResponseEntity.status(HttpStatus.OK).body(owner);
    }

    @GetMapping("{id}/is-borrowed")
    public ResponseEntity<Boolean> isBorrowed(@PathVariable Long id) {
        var isBorrowed = publicationService.isPublicationBorrowed(id);
        return ResponseEntity.status(HttpStatus.OK).body(isBorrowed);
    }
}
