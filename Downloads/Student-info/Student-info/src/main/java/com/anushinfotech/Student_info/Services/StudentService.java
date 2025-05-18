package com.anushinfotech.Student_info.Services;

import com.anushinfotech.Student_info.Model.Student;
import com.anushinfotech.Student_info.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    @Autowired
    private StudentRepository repo;
    public Student addstudent(Student student) {
        return repo.save(student);
    }
}
