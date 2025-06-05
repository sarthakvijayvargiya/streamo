package com.streamo.app.spring_streamo_backend.controllers;

import com.streamo.app.spring_streamo_backend.constants.AppConstants;
import com.streamo.app.spring_streamo_backend.entity.Streamo;
import com.streamo.app.spring_streamo_backend.op.CustomMessage;
import com.streamo.app.spring_streamo_backend.op.StatusOP;
import com.streamo.app.spring_streamo_backend.services.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Hashtable;
import java.util.List;
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

//    get video by id
    @GetMapping("/stream/{videoId}")
    public ResponseEntity<Resource> stream(
            @PathVariable String videoId
    ){
        Streamo video = videoService.getVideo(videoId);
        String contentType = video.getContentType();
        String filePath = video.getFilePath();

        if(contentType == null){
            contentType = "application/octet-stream";
        }

        Resource resource = new FileSystemResource(filePath);

        return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).body(resource);
    }

//    get all videos
    @GetMapping("/getAllVideos")
    public List<Streamo> getAll(){
         return videoService.getAllVideo();
    }

//    stream video in chunks
    @GetMapping("/stream/range/{videoId}")
    public ResponseEntity<Resource> streamVideoRange(
            @PathVariable String videoId,
            @RequestHeader(value ="Range", required = false) String range
    ){
        System.out.println(range);

        Streamo video = videoService.getVideo(videoId);


        Path path = Paths.get(video.getFilePath());

        System.out.println(video);
        System.out.println(path);
        System.out.println(video.getFilePath());

        Resource resource = new FileSystemResource(path);

        System.out.println(resource);

        String contentType = video.getContentType();

        if(contentType == null){
            contentType = "application/octet-stream";
        }

        System.out.println(contentType);

//        total file length
        long fileLength = path.toFile().length();

        System.out.println(fileLength);

        if(range==null){
            System.out.println(ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).body(resource));
            return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).body(resource);
        }

        long rangeStart;

        long rangeEnd;

        String[] ranges = range.replace("bytes=","").split("-");
        rangeStart = Long.parseLong(ranges[0]);

        rangeEnd = rangeStart+ AppConstants.CHUNK_SIZE-1;
        if(rangeEnd>= fileLength){
            rangeEnd = fileLength-1;
        }
//        if(ranges.length>1){
//            rangeEnd = Long.parseLong(ranges[1]);
//        }else{
//            rangeEnd = fileLength-1;
//        }
//
//        if(rangeEnd>fileLength-1){
//            rangeEnd = fileLength-1;
//        }

        InputStream inputStream;

        try {
            inputStream = Files.newInputStream(path);
//            skip till the start range
            inputStream.skip(rangeStart);
            long contentLength = rangeEnd-rangeStart+1;

            byte[] data = new byte[(int) contentLength];
            int read = inputStream.read(data,0,data.length);
            System.out.println("Read(No of bytes): " + read);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Range","bytes "+rangeStart+"-"+rangeEnd+"/"+fileLength);
            headers.add("Cache-Control","no-cache, no-store, must-revalidate");
            headers.add("Pragma","no-cache");
            headers.add("Expires","0");
            headers.add("X-Content-Type-Options","nosniff");

            headers.setContentLength(contentLength);

            return ResponseEntity
                    .status(HttpStatus.PARTIAL_CONTENT)
                    .headers(headers)
                    .contentType(MediaType.parseMediaType(contentType))
//                    .body(new InputStreamResource(inputStream));
                    .body(new ByteArrayResource(data));
        }catch (IOException ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

}
