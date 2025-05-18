package com.anushinfotech.Student_info.Repository;

import com.anushinfotech.Student_info.Model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student,Integer> {

}
