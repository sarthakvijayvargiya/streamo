package com.streamo.app.spring_streamo_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "streamo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Streamo {

    private String videoId;

    private String contentType;
    private String title;

    private String description;

    private String filePath;
}
