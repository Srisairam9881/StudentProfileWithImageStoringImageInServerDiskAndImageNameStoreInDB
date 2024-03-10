import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student, StudentResponse } from 'src/app/model/StudentResponse ';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
selector: 'app-get-student',
templateUrl: './get-student.component.html',
styleUrls: ['./get-student.component.css']
})
export class GetStudentComponent {
id!: number;
studentResponse!: StudentResponse;
constructor(private studentService: ApiServicesService, private route: ActivatedRoute) { }
ngOnInit(): void {
this.id = this.route.snapshot.params['id'];
this.studentResponse = { student: { id: 0, name: '', age: '', dob: '', gender: '', email: '', phoneNo: '', percentage: '', imageFileName: '' }, imageUrl: '' };
this.studentService.getStudentById(this.id).subscribe((data: StudentResponse) => {
this.studentResponse.student = data.student;
this.studentResponse.imageUrl = data.imageUrl;
});
}
}
