package com.ugnius.book.service;

import com.ugnius.book.dto.UserDto;
import com.ugnius.book.model.Admin;
import com.ugnius.book.model.Client;
import com.ugnius.book.model.User;
import com.ugnius.book.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ugnius.book.enums.UserType.*;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void createUser(UserDto userDto) {
        if(userRepository.findByUsername(userDto.getUsername()).isPresent()){
            throw new IllegalArgumentException("User already exists");
        }

        if (userDto.getUserType() == CLIENT) {
            Client client = Client.builder()
                    .username(userDto.getUsername())
                    .password(userDto.getPassword())
                    .name(userDto.getName())
                    .surname(userDto.getSurname())
                    .address(userDto.getAddress())
                    .birthdate(userDto.getBirthdate())
                    .userType(String.valueOf(CLIENT))
                    .build();

            userRepository.save(client);
        } else if (userDto.getUserType() == ADMIN) {
            Admin admin = Admin.builder()
                    .username(userDto.getUsername())
                    .password(userDto.getPassword())
                    .name(userDto.getName())
                    .surname(userDto.getSurname())
                    .phoneNum(userDto.getPhoneNum())
                    .userType(String.valueOf(ADMIN))
                    .build();

            userRepository.save(admin);
        }


    }

    public void updateUser(String username, UserDto userDto){
        if(userRepository.findByUsername(username).isEmpty()){
            throw new IllegalArgumentException("User does not exist");
        }

        var user = userRepository.findByUsername(username).get();

        user.setPassword(userDto.getPassword());
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
