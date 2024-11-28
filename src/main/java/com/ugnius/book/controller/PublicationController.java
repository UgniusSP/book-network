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
            @RequestParam("year") LocalDate year,
            @RequestParam("language") String language,
            @RequestParam("type") String type,
            @RequestParam("isbn") String isbn,
            @RequestParam("genre") String genre,
            @RequestParam("pageCount") int pageCount,
            @RequestParam("format") String format,
            @RequestParam("summary") String summary,
            @RequestParam("frequency") String frequency,
            @RequestParam("image") MultipartFile image) {
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
            @RequestParam("pageCount") int pageCount,
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

    @PostMapping("/borrow/{id}")
    public ResponseEntity<String> borrowPublication(@PathVariable Long id) {
        try {
            publicationService.borrowPublication(id);
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
        var response = publicationService.getPublicationCount();
        return ResponseEntity.ok(response);
    }


}
