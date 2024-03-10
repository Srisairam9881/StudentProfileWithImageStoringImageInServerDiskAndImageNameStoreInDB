package com.example.StudentDataWithImage.Response;

import com.example.StudentDataWithImage.enity.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@Getter
@Setter
public class studentResponse {
    private Student student;
    private String imageUrl;

}
