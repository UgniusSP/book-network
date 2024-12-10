package com.ugnius.book.repository;

import com.ugnius.book.dto.ClientDto;
import com.ugnius.book.model.User;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    void deleteByUsername(String username);

    @Transactional
    @Query("""
            SELECT new com.ugnius.book.dto.ClientDto(
                u.username,
                u.name,
                u.surname,
                c.address,
                c.birthdate
            )
            FROM User u
            LEFT JOIN Client c ON u.id = c.id
            WHERE u.username = :username
            """
    )
    Optional<ClientDto> findClientDetails(@NotNull @Param("username") String username);

    @Transactional
    @Query("""
            SELECT new com.ugnius.book.dto.ClientDto(
                u.username,
                u.name,
                u.surname,
                c.address,
                c.birthdate
            )
            FROM User u
            JOIN Client c ON u.id = c.id
            WHERE u.userType = 'CLIENT'
            """
    )
    List<ClientDto> findAllWhereUserTypeIsClient();

}
