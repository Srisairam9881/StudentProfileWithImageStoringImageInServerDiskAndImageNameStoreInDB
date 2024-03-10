package com.example.StudentDataWithImage.service.ServiceImpl;


import com.example.StudentDataWithImage.repo.studentRepo;
import com.example.StudentDataWithImage.service.studentService;
import com.example.StudentDataWithImage.enity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class studentServiceImpl implements studentService {

    @Autowired
    private studentRepo studentRepository;

    @Value("${project.image}")
    private String projectFilePath; // Retrieve project directory from properties
    private String getFileExtension(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        return originalFileName.substring(originalFileName.lastIndexOf('.'));
    }
    @Override
    //save student details
    public Student saveStudent(Student st, MultipartFile file) throws IOException {
        // Create directory if it doesn't exist
        File directory = new File(projectFilePath);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        // Generate a random file name
        String imageName = UUID.randomUUID().toString() + getFileExtension(file); // Random filename
        File imageFile = new File(projectFilePath, imageName);
        // Save the image to local disk
        FileOutputStream fos = new FileOutputStream(imageFile);
        fos.write(file.getBytes());
        fos.close();
        // Save student details to database
//        System.out.println(imageName);
        st.setImageFileName(imageName);
        return studentRepository.save(st);
    }

    @Override
    // Update student details with profile image
    public Student updateStudent(Long id, Student updatedStudent, MultipartFile file) throws IOException {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        // Update existing student details
        existingStudent.setName(updatedStudent.getName());
        existingStudent.setAge(updatedStudent.getAge());
        existingStudent.setDob(updatedStudent.getDob());
        existingStudent.setGender((updatedStudent.getGender()));
        existingStudent.setEmail(updatedStudent.getEmail());
        existingStudent.setPhoneNo(updatedStudent.getPhoneNo());
        existingStudent.setPercentage(updatedStudent.getPercentage());

        // Delete the old image file if it exists
        if (existingStudent.getImageFileName() != null) {
            File oldImageFile = new File(projectFilePath, existingStudent.getImageFileName());
            if (oldImageFile.exists()) {
                oldImageFile.delete(); // Delete the old image file
            }
        }

        // Update profile image if provided
        if (file != null && !file.isEmpty()) {
            String imageName = UUID.randomUUID().toString() + getFileExtension(file);
            File imageFile = new File(projectFilePath, imageName);
            FileOutputStream fos = new FileOutputStream(imageFile);
            fos.write(file.getBytes());
            fos.close();
            existingStudent.setImageFileName(imageName);
        }

        return studentRepository.save(existingStudent);
    }
    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentById(Long id) {
        Optional<Student> studentOptional = studentRepository.findById(id);
        return studentOptional.orElse(null);
    }
    // Delete student along with their profile image
    @Override
    public void deleteStudent(Long id) {
        // Find the student by ID
        Optional<Student> studentOptional = studentRepository.findById(id);
        studentOptional.ifPresent(student -> {
            // Delete the image file from local disk
            String imageFileName = student.getImageFileName();
            if (imageFileName != null && !imageFileName.isEmpty()) {
                File imageFile = new File(projectFilePath, imageFileName);
                if (imageFile.exists()) {
                    imageFile.delete();
                }
            }
            // Delete the student from the database
            studentRepository.deleteById(id);
        });
    }

}

