package com.ugnius.book.service;

import com.ugnius.book.dto.RegisterRequest;
import com.ugnius.book.model.Admin;
import com.ugnius.book.model.Client;
import com.ugnius.book.model.User;
import com.ugnius.book.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    public static final String USER_NOT_FOUND = "User not found";
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public void updateUser(String username, RegisterRequest userDto) {
        var user = getUser(username);

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

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserDetails(String authorizationHeader) {
        String username = getUsernameFromToken(authorizationHeader);
        return getUser(username);
    }

    private String getUsernameFromToken(String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        return jwtService.extractUsername(token);
    }

    public User getUser(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND));
    }

    @Transactional
    public void deleteUser(String username) {
        if(userRepository.findByUsername(username).isEmpty()){
            throw new IllegalArgumentException(USER_NOT_FOUND);
        }

        userRepository.deleteByUsername(username);
    }

    public Integer getUserCount() {
        return userRepository.findAll().size();
    }
}
