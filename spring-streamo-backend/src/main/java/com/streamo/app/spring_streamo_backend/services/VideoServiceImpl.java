package com.streamo.app.spring_streamo_backend.services;

import com.streamo.app.spring_streamo_backend.entity.Streamo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class VideoServiceImpl implements VideoService{


    @Override
    public Streamo saveVideo(Streamo video, MultipartFile file) {
        return null;
    }

    @Override
    public Streamo getVideo(String videoId) {
        return null;
    }

    @Override
    public List<Streamo> getAllVideo() {
        return null;
    }

    @Override
    public Streamo getVideoByTitle(String title) {
        return null;
    }
}
