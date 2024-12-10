package com.ugnius.book.controller;

import com.ugnius.book.model.Publication;
import com.ugnius.book.model.User;
import com.ugnius.book.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/publications")
    public ResponseEntity<List<Publication>> getAllPublications(){
        return ResponseEntity.ok(adminService.getAllPublications());
    }

    @DeleteMapping("/users")
    public ResponseEntity<Void> deleteUser(String username){
        adminService.deleteUser(username);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/publications")
    public ResponseEntity<Void> deletePublication(Long publicationId){
        adminService.deletePublication(publicationId);
        return ResponseEntity.noContent().build();
    }
}
