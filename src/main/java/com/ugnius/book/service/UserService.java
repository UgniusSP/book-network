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

    public void updateUser(String username, RegisterRequest userDto){
        if(userRepository.findByUsername(username).isEmpty()){
            throw new IllegalArgumentException("User does not exist");
        }

        var user = userRepository.findByUsername(username).get();

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

    public User getUser(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User does not exist"));
    }

    @Transactional
    public void deleteUser(String username) {
        if(userRepository.findByUsername(username).isEmpty()){
            throw new IllegalArgumentException("User does not exist");
        }

        userRepository.deleteByUsername(username);
    }

    public Integer getUserCount(){
        return userRepository.findAll().size();
    }
}
