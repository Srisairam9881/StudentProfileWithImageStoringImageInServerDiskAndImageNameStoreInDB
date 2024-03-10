import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentResponse } from 'src/app/model/StudentResponse ';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
selector: 'app-update-student',
templateUrl: './update-student.component.html',
styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit{
selectedFile!: File;
student={
name:'',
age:'',
dob:'',
gender:'',
email:'',
phoneNo:'',
percentage:'',
imageFileName:''
}
id!: number;
studentResponse!: StudentResponse;
constructor(private studentService: ApiServicesService, private route: ActivatedRoute,private router:Router) { }
onFileSelected(event:any): void {
this.selectedFile = event.target.files[0];
}
ngOnInit(): void {
this.id = this.route.snapshot.params['id'];
this.studentResponse = { student: { id: 0, name: '', age: '', dob: '', gender: '', email: '', phoneNo: '', percentage: '', imageFileName: '' }, imageUrl: '' };
this.studentService.getStudentById(this.id).subscribe((data: StudentResponse) => {
this.studentResponse.student = data.student;
this.studentResponse.imageUrl = data.imageUrl;
});
}
updateStudent(){
const formData = new FormData();
formData.append("name",this.student.name);
formData.append("age",this.student.age);
formData.append("dob",this.student.dob);
formData.append("gender",this.student.gender);
formData.append("email",this.student.email);
formData.append("phoneNo",this.student.phoneNo);
formData.append("percentage",this.student.percentage);
formData.append('image', this.selectedFile); // Use 'image' as the key
this.studentService.updateStudent(this.id,formData).subscribe((data)=>{
alert("student data has been upadated successfully");
this.goListStudent();
})
}
onSubmit()
{
this.updateStudent();
}

goListStudent()
{
this.router.navigate(['/students']);
}
}
