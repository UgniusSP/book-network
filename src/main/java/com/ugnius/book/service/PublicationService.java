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

        if(publicationDto.getTitle().isEmpty() || publicationDto.getAuthor().isEmpty() || publicationDto.getPublicationDate() == null){
            throw new IllegalArgumentException("Missing required fields");
        }

        if (publicationDto.getPublicationType() == BOOK) {
            Book book = Book.builder()
                    .title(publicationDto.getTitle())
                    .author(publicationDto.getAuthor())
                    .publicationDate(publicationDto.getPublicationDate())
                    .language(publicationDto.getLanguage())
                    .publicationType(String.valueOf(BOOK))
                    .isbn(publicationDto.getIsbn())
                    .genre(publicationDto.getGenre())
                    .pageCount(publicationDto.getPageCount())
                    .format(publicationDto.getFormat())
                    .summary(publicationDto.getSummary())
                    .build();

            publicationRepository.save(book);
        } else if(publicationDto.getPublicationType() == PERIODICAL) {
            Periodical periodical = Periodical.builder()
                    .title(publicationDto.getTitle())
                    .author(publicationDto.getAuthor())
                    .publicationDate(publicationDto.getPublicationDate())
                    .language(publicationDto.getLanguage())
                    .publicationType(String.valueOf(PERIODICAL))
                    .issueNumber(publicationDto.getIssueNumber())
                    .editor(publicationDto.getEditor())
                    .frequency(publicationDto.getFrequency())
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
            book.setIsbn(publicationDto.getIsbn());
            book.setGenre(publicationDto.getGenre());
            book.setPageCount(publicationDto.getPageCount());
            book.setLanguage(publicationDto.getLanguage());
            book.setPublicationDate(publicationDto.getPublicationDate());
            book.setFormat(publicationDto.getFormat());
            book.setSummary(publicationDto.getSummary());
        } else if(publication instanceof Periodical periodical){
            periodical.setIssueNumber(publicationDto.getIssueNumber());
            periodical.setPublicationDate(publicationDto.getPublicationDate());
            periodical.setEditor(publicationDto.getEditor());
            periodical.setFrequency(publicationDto.getFrequency());
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

    public Integer getPublicationCount(){
        return publicationRepository.findAll().size();
    }
}
