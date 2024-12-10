package com.ugnius.book.controller;

import com.ugnius.book.dto.ClientDto;
import com.ugnius.book.dto.RegisterRequest;
import com.ugnius.book.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private final ClientService clientService;

    @GetMapping("/{publicationId}")
    public ResponseEntity<ClientDto> getClientDetailsByPublicationId(@PathVariable Long publicationId) {
        var client = clientService.getClientDetailsByPublicationId(publicationId);
        return ResponseEntity.status(HttpStatus.OK).body(client);
    }

    @GetMapping
    public ResponseEntity<ClientDto> getMyDetails() {
        var client = clientService.getMyDetails();
        return ResponseEntity.status(HttpStatus.OK).body(client);
    }

    @PutMapping
    public ResponseEntity<String> updateUser(@RequestBody RegisterRequest userDto) {
        try {
            clientService.updateUser(userDto);
            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deleteUser() {
        try {
            clientService.deleteUser();
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
