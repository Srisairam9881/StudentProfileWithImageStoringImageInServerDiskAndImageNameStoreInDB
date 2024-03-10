package com.example.StudentDataWithImage.repo;

import com.example.StudentDataWithImage.enity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface studentRepo extends JpaRepository<Student,Long> {
}
