package com.streamo.app.spring_streamo_backend.services;

import com.streamo.app.spring_streamo_backend.entity.Streamo;
import com.streamo.app.spring_streamo_backend.op.CustomMessage;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VideoService {

//    Save Video
    CustomMessage saveVideo(Streamo video, MultipartFile file);

//    Get Video by id
    Streamo getVideo(String videoId);

//    Get All Video
    List<Streamo> getAllVideo();

//    Get Video By Title
    Streamo getVideoByTitle(String title);
}
