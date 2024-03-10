package com.example.StudentDataWithImage.controller;

import com.example.StudentDataWithImage.Response.studentResponse;
import com.example.StudentDataWithImage.enity.Student;
import com.example.StudentDataWithImage.repo.studentRepo;
import com.example.StudentDataWithImage.service.studentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api/student")
@Controller
@CrossOrigin("*")
public class studentController {
    @Autowired
    private studentService ss;
    @Autowired
    private studentRepo sr;
    @PostMapping("/add")
    public ResponseEntity<String> addStudent(@ModelAttribute Student st, @RequestParam("image") MultipartFile file) throws IOException {
        try {
            ss.saveStudent(st,file);
            Student s=sr.save(st);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.ok().body("Something wrong!!!");
        }
        return ResponseEntity.ok().body("Data has been added successfully");
    }
    @GetMapping("/all")
    public ResponseEntity<List<studentResponse>> getAllStudents() {
        List<Student> students = ss.getAllStudents();
        List<studentResponse> responses = students.stream()
                .map(student -> new studentResponse(student, getImageUrl(student.getImageFileName())))
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<studentResponse> getStudentById(@PathVariable Long id) {
        Student student = ss.getStudentById(id);
        if (student == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(new studentResponse(student, getImageUrl(student.getImageFileName())));
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable Long id, @ModelAttribute Student st, @RequestParam(value = "image", required = false) MultipartFile file) throws IOException {
        try {
            ss.updateStudent(id, st, file);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body("Something wrong!!!");
        }
        return ResponseEntity.ok().body("Data has been updated successfully");
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        try {
            ss.deleteStudent(id);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body("Something wrong!!!");
        }
        return ResponseEntity.ok().body("Student has been deleted successfully");
    }

    // Method to get image URL
    private String getImageUrl(String imageName) {
        // Construct the URL based on your image storage logic
        return "http://localhost:8080/images/" + imageName;
    }

}
