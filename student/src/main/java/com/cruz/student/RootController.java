package com.cruz.student;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class RootController {

    @GetMapping("/")
    public String root() {
        return "Student API is online!";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}
