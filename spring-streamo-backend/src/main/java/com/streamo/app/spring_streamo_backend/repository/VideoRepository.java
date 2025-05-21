package com.streamo.app.spring_streamo_backend.repository;

import com.streamo.app.spring_streamo_backend.entity.Streamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VideoRepository extends JpaRepository<Streamo,String> {

    Optional<Streamo> findByTitle(String title);
}
