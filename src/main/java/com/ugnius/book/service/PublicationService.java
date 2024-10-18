package com.ugnius.book.service;

import com.ugnius.book.dto.PublicationDto;
import com.ugnius.book.model.*;
import com.ugnius.book.repository.PublicationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ugnius.book.enums.PublicationType.*;

@Service
@AllArgsConstructor
public class PublicationService {

    private final PublicationRepository publicationRepository;

    public void createPublication(PublicationDto publicationDto) {
        if(publicationRepository.findByTitle(publicationDto.getTitle()).isPresent()){
            throw new IllegalArgumentException("Publication already exists");
        }

        if (publicationDto.getPublicationType() == BOOK) {
            Book book = Book.builder()
                    .title(publicationDto.getTitle())
                    .author(publicationDto.getAuthor())
                    .publisher(publicationDto.getPublisher())
                    .isbn(publicationDto.getIsbn())
                    .genre(publicationDto.getGenre())
                    .pageCount(publicationDto.getPageCount())
                    .language(publicationDto.getLanguage())
                    .publicationYear(publicationDto.getPublicationYear())
                    .format(publicationDto.getFormat())
                    .summary(publicationDto.getSummary())
                    .build();

            publicationRepository.save(book);
        } else if(publicationDto.getPublicationType() == PERIODICAL) {
            Periodical periodical = Periodical.builder()
                    .title(publicationDto.getTitle())
                    .author(publicationDto.getAuthor())
                    .issueNumber(publicationDto.getIssueNumber())
                    .publicationDate(publicationDto.getPublicationDate())
                    .editor(publicationDto.getEditor())
                    .frequency(publicationDto.getFrequency())
                    .publisher(publicationDto.getPublisher())
                    .build();

            publicationRepository.save(periodical);
        }

    }

    public void updatePublication(String title, PublicationDto publicationDto){
        if(publicationRepository.findByTitle(title).isEmpty()){
            throw new IllegalArgumentException("Publication does not exist");
        }

        var publication = publicationRepository.findByTitle(title).get();

        publication.setAuthor(publicationDto.getAuthor());

        if(publication instanceof Book book){
            book.setPublisher(publicationDto.getPublisher());
            book.setIsbn(publicationDto.getIsbn());
            book.setGenre(publicationDto.getGenre());
            book.setPageCount(publicationDto.getPageCount());
            book.setLanguage(publicationDto.getLanguage());
            book.setPublicationYear(publicationDto.getPublicationYear());
            book.setFormat(publicationDto.getFormat());
            book.setSummary(publicationDto.getSummary());
        } else if(publication instanceof Periodical periodical){
            periodical.setIssueNumber(publicationDto.getIssueNumber());
            periodical.setPublicationDate(publicationDto.getPublicationDate());
            periodical.setEditor(publicationDto.getEditor());
            periodical.setFrequency(publicationDto.getFrequency());
            periodical.setPublisher(publicationDto.getPublisher());
        }

        publicationRepository.save(publication);
    }

    public List<Publication> getAllPublications(){
        return publicationRepository.findAll();
    }

    public Publication getPublication(String title){
        return publicationRepository.findByTitle(title).orElseThrow(() -> new IllegalArgumentException("Publication does not exist"));
    }

    @Transactional
    public void deletePublication(String title){
        if(publicationRepository.findByTitle(title).isEmpty()){
            throw new IllegalArgumentException("Publication does not exist");
        }

        publicationRepository.delete(publicationRepository.findByTitle(title).get());
    }
}
