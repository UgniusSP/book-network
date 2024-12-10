package com.ugnius.book.controller;

import com.ugnius.book.dto.ClientDto;
import com.ugnius.book.model.Publication;
import com.ugnius.book.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<ClientDto>> getAllUsers(){
        return ResponseEntity.ok(adminService.getAllClients());
    }

    @GetMapping("/publications")
    public ResponseEntity<List<Publication>> getAllPublications(){
        return ResponseEntity.ok(adminService.getAllPublications());
    }

    @DeleteMapping("/{username}/users")
    public ResponseEntity<Void> deleteUser(@PathVariable String username){
        adminService.deleteUser(username);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{publicationId}/publications")
    public ResponseEntity<Void> deletePublication(@PathVariable Long publicationId){
        adminService.deletePublication(publicationId);
        return ResponseEntity.noContent().build();
    }
}
