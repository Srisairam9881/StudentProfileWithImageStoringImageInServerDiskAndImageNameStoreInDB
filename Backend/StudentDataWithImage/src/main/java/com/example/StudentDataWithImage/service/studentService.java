package com.example.StudentDataWithImage.service;

import com.example.StudentDataWithImage.enity.Student;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface studentService {
    public Student saveStudent(Student st,MultipartFile file) throws IOException;
    public Student updateStudent(Long id,Student st,MultipartFile file) throws IOException;
    List<Student> getAllStudents();
    Student getStudentById(Long id);
    void deleteStudent(Long id);

}
