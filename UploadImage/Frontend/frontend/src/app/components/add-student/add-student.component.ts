import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
selector: 'app-add-student',
templateUrl: './add-student.component.html',
styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
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
constructor(private apiService: ApiServicesService,private router:Router) { }

onFileSelected(event:any): void {
this.selectedFile = event.target.files[0];
}
ngOnInit(): void {}
saveStudent(){
const formData = new FormData();
formData.append("name",this.student.name);
formData.append("age",this.student.age);
formData.append("dob",this.student.dob);
formData.append("gender",this.student.gender);
formData.append("email",this.student.email);
formData.append("phoneNo",this.student.phoneNo);
formData.append("percentage",this.student.percentage);
formData.append('image', this.selectedFile); // Use 'image' as the key
this.apiService.createStudent(formData).subscribe(
(response) => {
alert('Data has been added successfully');
this.goToStudentList();
},
(error) => {
console.log('Error uploading image:', error);
alert('Error uploading image');
}
);
}

goToStudentList()
{
this.router.navigate(['/students']);
}
onSubmit()
{
this.saveStudent();
}
}
