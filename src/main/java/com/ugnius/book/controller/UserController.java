package com.ugnius.book.controller;

import com.ugnius.book.dto.RegisterRequest;
import com.ugnius.book.model.User;
import com.ugnius.book.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUserDetails(@RequestHeader("Authorization") String authorizationHeader) {
        User user = userService.getUserDetails(authorizationHeader);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username) {
        User user = userService.getUser(username);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/{username}")
    public ResponseEntity<String> updateUser(@PathVariable String username, @RequestBody RegisterRequest userDto) {
        try {
            userService.updateUser(username, userDto);
            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        try {
            userService.deleteUser(username);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getUsersCount() {
        return new ResponseEntity<>(userService.getUserCount(), HttpStatus.OK);
    }
}
