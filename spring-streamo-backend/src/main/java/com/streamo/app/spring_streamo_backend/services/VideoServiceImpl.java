package com.streamo.app.spring_streamo_backend.services;

import com.streamo.app.spring_streamo_backend.entity.Streamo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class VideoServiceImpl implements VideoService {

    @Value("${files.video}")
    String DIR;

    @Override
    public Streamo saveVideo(Streamo video, MultipartFile file) {
//       Folder Path : create
        try {

//        Get Original File Name
            String fileName = file.getOriginalFilename();
            String contentType = file.getContentType();
            InputStream inputStream = file.getInputStream();


//        Fodder path with file name
            String cleanFileName = StringUtils.cleanPath(fileName);
            String cleanFolder = StringUtils.cleanPath(DIR);

            Path path = Paths.get(cleanFolder , cleanFileName);

            System.out.println(path);
//        Copy file to the folder

//        video metadata

//        save metadata to DB

        } catch (Exception e) {
            e.printStackTrace();
        }
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
