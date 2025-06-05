package com.streamo.app.spring_streamo_backend.services;

import com.streamo.app.spring_streamo_backend.entity.Streamo;
import com.streamo.app.spring_streamo_backend.op.CustomMessage;
import com.streamo.app.spring_streamo_backend.op.StatusOP;
import com.streamo.app.spring_streamo_backend.repository.VideoRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class VideoServiceImpl implements VideoService {

    @Autowired
    VideoRepository videoRepository;

    @Value("${files.video}")
    String DIR;

    @PostConstruct
    public void init(){
        File file = new File(DIR);

        if(!file.exists()){
            file.mkdirs();
            System.out.println("Folder Created");
        }else{
            System.out.println("Folder already Created");
        }
    }

    @Override
    public CustomMessage saveVideo(Streamo video, MultipartFile file) {
//       Folder Path : create
        StatusOP statusOP = new StatusOP();
        CustomMessage custMess = new CustomMessage();
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
            System.out.println(inputStream);
//        Copy file to the folder
            Files.copy(inputStream,path, StandardCopyOption.REPLACE_EXISTING);

//        video metadata
            video.setContentType(contentType);
            video.setFilePath(path.toString());

//        save metadata to DB
            videoRepository.save(video);

            statusOP.setStatusErrorFlag("N");
            statusOP.setStatusErrorCode("SUCCESS");
            statusOP.setStatusDesc("Saved Video Successfully");
            custMess.setStatusOP(statusOP);
            return custMess;
        } catch (Exception e) {
            e.printStackTrace();
            statusOP.setStatusErrorFlag("Y");
            statusOP.setStatusErrorCode("ERROR");
            statusOP.setStatusDesc("Failed to Save Video");
            custMess.setStatusOP(statusOP);
            return custMess;
        }
    }

    @Override
    public Streamo getVideo(String videoId) {
        Streamo video = videoRepository.findById(videoId).orElseThrow(()->new RuntimeException("Video Not Fount"));
        return video;
    }

    @Override
    public List<Streamo> getAllVideo() {
        return videoRepository.findAll();
    }

    @Override
    public Streamo getVideoByTitle(String title) {
        return null;
    }
}
