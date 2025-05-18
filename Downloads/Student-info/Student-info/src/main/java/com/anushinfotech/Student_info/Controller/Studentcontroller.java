package com.anushinfotech.Student_info.Controller;

import com.anushinfotech.Student_info.Model.Student;
import com.anushinfotech.Student_info.Services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")

public class Studentcontroller {
    @Autowired
    private StudentService service;

    @PostMapping("/addstudent")
    public Student addStudent(@RequestBody Student student){

        return service.addstudent(student);
    }
}
