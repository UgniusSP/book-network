package com.ugnius.book.service;

import com.ugnius.book.dto.PublicationDto;
import com.ugnius.book.exception.PublicationDoesNotExist;
import com.ugnius.book.model.*;
import com.ugnius.book.repository.PublicationRepository;
import com.ugnius.book.repository.specification.BookSpecification;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ugnius.book.enums.PublicationType.BOOK;
import static com.ugnius.book.enums.PublicationType.PERIODICAL;

@Service
@AllArgsConstructor
public class PublicationService {

    private static final String PUBLICATION_DOES_NOT_EXIST = "Publication does not exist";
    private final PublicationRepository publicationRepository;
    private final AuthenticationService authenticationService;

    public Publication addPublication(PublicationDto publicationDto) {
        var user = authenticationService.getAuthenticatedUser();

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
                    .image(publicationDto.getImage())
                    .client((Client) user)
                    .isAvailable(true)
                    .build();

            publicationRepository.save(book);

            return book;
        } else if(publicationDto.getPublicationType() == PERIODICAL) {
            Periodical periodical = Periodical.builder()
                    .title(publicationDto.getTitle())
                    .author(publicationDto.getAuthor())
                    .publicationDate(publicationDto.getPublicationDate())
                    .language(publicationDto.getLanguage())
                    .summary(publicationDto.getSummary())
                    .publicationType(String.valueOf(PERIODICAL))
                    .frequency(publicationDto.getFrequency())
                    .image(publicationDto.getImage())
                    .client((Client) user)
                    .isAvailable(true)
                    .build();

            publicationRepository.save(periodical);

            return periodical;
        }

        return null;
    }

    public Publication updatePublication(Long id, PublicationDto publicationDto){
        var user = authenticationService.getAuthenticatedUser();

        doesPublicationExist(id);

        var publication = getPublication(id);
        validateOwnership(user, publication);

        publication.setImage(publicationDto.getImage());
        publication.setSummary(publicationDto.getSummary());

        if(publication instanceof Book book){
            book.setIsbn(publicationDto.getIsbn());
            book.setGenre(publicationDto.getGenre());
            book.setPageCount(publicationDto.getPageCount());
            book.setFormat(publicationDto.getFormat());
        } else if(publication instanceof Periodical periodical){
            periodical.setFrequency(publicationDto.getFrequency());
        }

        publicationRepository.save(publication);
        return publication;
    }

    public List<Publication> getAllPublications(){
        return publicationRepository.findAll();
    }

    public List<Publication> getFilteredPublications(String genre, String language, String publicationType){
        Specification<Publication> spec = Specification.where(null);

        if (genre != null && !genre.isEmpty()) {
            spec = spec.and(BookSpecification.hasGenre(genre));
        }

        if (language != null && !language.isEmpty()) {
            spec = spec.and(BookSpecification.hasLanguage(language));
        }

        if(publicationType != null && !publicationType.isEmpty()){
            spec = spec.and(BookSpecification.hasPublicationType(publicationType));
        }

        return publicationRepository.findAll(spec);
    }

    @Transactional
    public void deletePublication(Long id){
        var user = authenticationService.getAuthenticatedUser();

        doesPublicationExist(id);

        var publication = getPublication(id);
        validateOwnership(user, publication);

        publicationRepository.delete(publication);
    }

    public void borrowPublication(Long id){
        var user = authenticationService.getAuthenticatedUser();

        var publication = getPublication(id);

        if(publication.isAvailable() && !publication.getClient().getUsername().equals(user.getUsername())){
            publication.setBorrower((Client) user);
            publication.setAvailable(false);
        } else {
            throw new IllegalArgumentException("Publication is not available or user cant borrow from himself");
        }

        publicationRepository.save(publication);
    }

    public boolean isPublicationBorrowed(Long id){
        var user = authenticationService.getAuthenticatedUser();
        var publication = publicationRepository.findByIdAndBorrower(id, (Client) user);

        return publication.isPresent();
    }

    public void returnPublication(Long id){
        var user = authenticationService.getAuthenticatedUser();

        var publication = getPublication(id);

        validateBorrowOwnership(user, publication);

        publication.setBorrower(null);
        publication.setAvailable(true);
        publicationRepository.save(publication);
    }

    public String getOwnerUsernameByPublication(Long id){
        var publication = getPublication(id);
        return publication.getClient().getUsername();
    }

    public Publication getPublication(Long id){
        doesPublicationExist(id);
        return publicationRepository.findById(id).orElseThrow(() -> new IllegalArgumentException(PUBLICATION_DOES_NOT_EXIST));
    }

    private void doesPublicationExist(Long id) {
        if(publicationRepository.findById(id).isEmpty()){
            throw new PublicationDoesNotExist();
        }
    }

    private void validateOwnership(User user, Publication publication) {
        if (!publication.getClient().getId().equals(user.getId())) {
            throw new IllegalArgumentException("You can't edit other user's publication");
        }
    }

    private void validateBorrowOwnership(User user, Publication publication) {
        if (!publication.getBorrower().getId().equals(user.getId())) {
            throw new IllegalArgumentException("You can't return other user's publication");
        }
    }
}
