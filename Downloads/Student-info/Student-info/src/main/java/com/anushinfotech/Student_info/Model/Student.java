package com.anushinfotech.Student_info.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    public int id;
    public String name;
    public String email;
    public String branch;
    public String college;
    public String phonenumber;
}
