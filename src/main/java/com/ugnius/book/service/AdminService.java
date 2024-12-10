package com.ugnius.book.service;

import com.ugnius.book.dto.ClientDto;
import com.ugnius.book.model.Admin;
import com.ugnius.book.model.Client;
import com.ugnius.book.model.Publication;
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

        var user = userRepository.findByUsername(userToDelete)
                .orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND));

        userRepository.delete(user);
    }

    public void deletePublication(Long publicationId){
        var username = authenticationService.getAuthenticatedUser().getUsername();
        checkIfUserIsAdmin(username);

        var publication = publicationRepository.findById(publicationId)
                .orElseThrow(() -> new IllegalArgumentException("Publication not found"));

        publicationRepository.delete(publication);
    }

    private void checkIfUserIsAdmin(String username){
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND));

        if(!(user instanceof Admin)){
            throw new IllegalArgumentException("User is not an admin");
        }
    }
}
