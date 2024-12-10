package com.ugnius.book.service;

import com.ugnius.book.dto.ClientDto;
import com.ugnius.book.model.Admin;
import com.ugnius.book.model.Publication;
import com.ugnius.book.model.User;
import com.ugnius.book.repository.PublicationRepository;
import com.ugnius.book.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ugnius.book.service.UserService.USER_NOT_FOUND;

@Service
@AllArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final PublicationRepository publicationRepository;
    private final AuthenticationService authenticationService;

    @Transactional
    public List<ClientDto> getAllClients(){
        var username = authenticationService.getAuthenticatedUser().getUsername();
        checkIfUserIsAdmin(username);

        return userRepository.findAllWhereUserTypeIsClient();
    }

    @Transactional
    public List<Publication> getAllPublications(){
        var username = authenticationService.getAuthenticatedUser().getUsername();
        checkIfUserIsAdmin(username);

        return publicationRepository.findAll();
    }

    public void deleteUser(String userToDelete){
        var username = authenticationService.getAuthenticatedUser().getUsername();
        checkIfUserIsAdmin(username);

        var user = getUser(userToDelete);

        userRepository.delete(user);
    }

    public void deletePublication(Long publicationId){
        var username = authenticationService.getAuthenticatedUser().getUsername();
        checkIfUserIsAdmin(username);
        isBookAvailable(publicationId);

        var publication = getPublication(publicationId);

        publicationRepository.delete(publication);
    }

    private void checkIfUserIsAdmin(String username){
        var user = getUser(username);

        if(!(user instanceof Admin)){
            throw new IllegalArgumentException("User is not an admin");
        }
    }

    private void isBookAvailable(Long publicationId){
        var publication = getPublication(publicationId);

        if(publication.getBorrower() != null){
            throw new IllegalArgumentException("Book is not available");
        }
    }

    private User getUser(String userToDelete) {
        return userRepository.findByUsername(userToDelete)
                .orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND));
    }

    private Publication getPublication(Long publicationId) {
        return publicationRepository.findById(publicationId)
                .orElseThrow(() -> new IllegalArgumentException("Publication not found"));
    }
}
