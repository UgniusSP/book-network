package com.ugnius.book.service;

import com.ugnius.book.dto.ClientDto;
import com.ugnius.book.dto.RegisterRequest;
import com.ugnius.book.model.Admin;
import com.ugnius.book.model.Client;
import com.ugnius.book.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserService {

    public static final String USER_NOT_FOUND = "User not found";
    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;
    private final PublicationService publicationService;

    public void updateUser(RegisterRequest userDto) {
        var user = authenticationService.getAuthenticatedUser();

        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());

        if(user instanceof Client client){
            client.setAddress(userDto.getAddress());
            client.setBirthdate(userDto.getBirthdate());
        } else {
            Admin admin = (Admin) user;
            admin.setPhoneNum(userDto.getPhoneNum());
        }

        userRepository.save(user);
    }

    public ClientDto getClientDetailsByPublicationId(Long publicationId){
        var username = publicationService.getOwnerUsernameByPublication(publicationId);

        return userRepository.findClientDetails(username)
                .orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND));
    }

    public ClientDto getMyDetails(){
        var username = authenticationService.getAuthenticatedUser().getUsername();

        return userRepository.findClientDetails(username)
                .orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND));
    }

    @Transactional
    public void deleteUser() {
        var user = authenticationService.getAuthenticatedUser();

        if(userRepository.findByUsername(user.getUsername()).isEmpty()){
            throw new IllegalArgumentException(USER_NOT_FOUND);
        }

        userRepository.delete(user);
    }

    public Integer getUserCount() {
        return userRepository.findAll().size();
    }
}
