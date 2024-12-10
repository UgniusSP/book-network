package com.ugnius.book.model;

import com.ugnius.book.enums.UserType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class Client extends User {
    private String address;
    private LocalDate birthdate;

    @OneToMany(mappedBy = "client")
    private List<Publication> ownedPublications;

    @OneToMany(mappedBy = "borrower")
    private List<Publication> borrowedPublications;

    @OneToMany(mappedBy = "client")
    private List<Review> reviews;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(UserType.CLIENT.name()));
    }
}
