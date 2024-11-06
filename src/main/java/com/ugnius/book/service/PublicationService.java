package com.ugnius.book.service;

import com.ugnius.book.dto.PublicationDto;
import com.ugnius.book.model.*;
import com.ugnius.book.repository.PublicationRepository;
import com.ugnius.book.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ugnius.book.enums.PublicationType.*;
import static com.ugnius.book.service.UserService.*;

@Service
@AllArgsConstructor
public class PublicationService {

    private static final String PUBLICATION_DOES_NOT_EXIST = "Publication does not exist";
    private final PublicationRepository publicationRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public void addPublication(PublicationDto publicationDto, String authorizationHeader) {
        String username = getUsernameFromToken(authorizationHeader);

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
                    .client((Client) getUser(username))
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
                    .client((Client) getUser(username))
                    .build();

            publicationRepository.save(periodical);
        }

    }

    public void updatePublication(String title, PublicationDto publicationDto){
        if(publicationRepository.findByTitle(title).isEmpty()){
            throw new IllegalArgumentException(PUBLICATION_DOES_NOT_EXIST);
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
        return publicationRepository.findByTitle(title).orElseThrow(() -> new IllegalArgumentException(PUBLICATION_DOES_NOT_EXIST));
    }

    @Transactional
    public void deletePublication(String title){
        if(publicationRepository.findByTitle(title).isEmpty()){
            throw new IllegalArgumentException(PUBLICATION_DOES_NOT_EXIST);
        }

        publicationRepository.delete(publicationRepository.findByTitle(title).get());
    }

    public void borrowPublication(Long id, String authorizationHeader){
        String username = getUsernameFromToken(authorizationHeader);
        var publication = publicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(PUBLICATION_DOES_NOT_EXIST));

        if(publication.isAvailable()){
            publication.setBorrower((Client) getUser(username));
            publication.setAvailable(false);
        } else {
            throw new IllegalArgumentException("Publication is not available");
        }

        publicationRepository.save(publication);
    }

    public void returnPublication(Long id){
        var publication = publicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(PUBLICATION_DOES_NOT_EXIST));

        publication.setBorrower(null);
        publication.setAvailable(true);
        publicationRepository.save(publication);
    }

    public Integer getPublicationCount(){
        return publicationRepository.findAll().size();
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
