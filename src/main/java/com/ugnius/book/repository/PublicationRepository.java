package com.ugnius.book.repository;

import com.ugnius.book.model.Client;
import com.ugnius.book.model.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Long> {
    @Transactional
    Optional<Publication> findByIdAndBorrower(Long id, Client borrower);
}
