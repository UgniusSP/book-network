package com.ugnius.book.service;

import com.ugnius.book.dto.AuthenticationRequest;
import com.ugnius.book.dto.AuthenticationResponse;
import com.ugnius.book.dto.RegisterRequest;
import com.ugnius.book.exception.AuthenticationException;
import com.ugnius.book.model.Admin;
import com.ugnius.book.model.Client;
import com.ugnius.book.model.User;
import com.ugnius.book.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.ugnius.book.enums.UserType.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public void register(RegisterRequest request) {

        if(request.getUserType() == ADMIN){
            var user =
                    Admin.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .name(request.getName())
                    .surname(request.getSurname())
                    .phoneNum(request.getPhoneNum())
                    .userType(String.valueOf(ADMIN))
                    .build();
            userRepository.save(user);
        } else if (request.getUserType() == CLIENT){
            var user =
                    Client.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .name(request.getName())
                    .surname(request.getSurname())
                    .address(request.getAddress())
                    .birthdate(request.getBirthdate())
                    .userType(String.valueOf(CLIENT))
                    .build();
            userRepository.save(user);
        }
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        var user =
                userRepository
                        .findByUsername(request.getUsername())
                        .orElseThrow(() -> new RuntimeException(UserService.USER_NOT_FOUND));

        var jwtToken = jwtService.generateToken(user);
        var usertype = user.getUserType();

        return AuthenticationResponse.builder().token(jwtToken).usertype(usertype).build();
    }

    public User getAuthenticatedUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new AuthenticationException();
        }
        return (User) authentication.getPrincipal();
    }
}
