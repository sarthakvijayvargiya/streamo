package com.streamo.app.spring_streamo_backend.controllers;

import com.streamo.app.spring_streamo_backend.entity.Streamo;
import com.streamo.app.spring_streamo_backend.op.CustomMessage;
import com.streamo.app.spring_streamo_backend.op.StatusOP;
import com.streamo.app.spring_streamo_backend.services.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Hashtable;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/videos")
@CrossOrigin("*")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping("/save")
    public ResponseEntity<CustomMessage> create(
            @RequestParam("file")MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description
            ){
        CustomMessage cusMess = new CustomMessage();
        StatusOP statusOP = new StatusOP();
        try{
            Streamo video = new Streamo();
            video.setTitle(title);
            video.setDescription(description);
            video.setVideoId(UUID.randomUUID().toString());
            cusMess = videoService.saveVideo(video, file);
            return ResponseEntity.ok(cusMess);

        }catch (Exception e){
            statusOP.setStatusErrorFlag("Y");
            statusOP.setStatusErrorCode("ERROR");
            statusOP.setStatusDesc(e.getMessage());
            cusMess.setStatusOP(statusOP);
        }

        return ResponseEntity.ok(cusMess);
    }
}
