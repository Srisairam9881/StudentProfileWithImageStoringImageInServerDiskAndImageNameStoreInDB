import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student, StudentResponse } from 'src/app/model/StudentResponse ';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
selector: 'app-list-students',
templateUrl: './list-students.component.html',
styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {
students: StudentResponse[] = [];
constructor(private apiService: ApiServicesService,private router:Router) { }

ngOnInit(): void {
this.loadStudents();
}

loadStudents(): void {
this.apiService.getStudentList()
.subscribe(
(data: StudentResponse[]) => { // Adjusted to accept array of StudentResponse
this.students = data;
},
(error) => {
console.error('Error fetching students:', error);
}
);
}
studentDetails(id:number)
{
this.router.navigate(['/student-details',id]);
}

updateStudent(id:number)
{
this.router.navigate(['/update-student',id]);
}
deleteStudent(id:number)
{
this.apiService.delteStudent(id).subscribe(data=>{
this.loadStudents();
window.location.reload();
});
}
}
