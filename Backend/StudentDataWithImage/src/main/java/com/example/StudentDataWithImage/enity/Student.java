package com.example.StudentDataWithImage.enity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String age;
    private String dob;
    private String gender;
    private String email;
    @Size(min = 10,max = 10)
    private String phoneNo;
    private String percentage;
    private String imageFileName; // Store the filename of the image
}