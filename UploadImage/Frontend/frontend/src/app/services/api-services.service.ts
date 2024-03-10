import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentResponse } from '../model/StudentResponse ';

@Injectable({
providedIn: 'root'
})
export class ApiServicesService {
private baseUrl = "http://localhost:8080/api/student";
constructor(private httpClient:HttpClient) { }

//Get All students
getStudentList():Observable<StudentResponse[]>
{
return this.httpClient.get<StudentResponse[]>(`${this.baseUrl}/all`);
}

//Add Record
createStudent(formData:FormData):Observable<string>
{
return this.httpClient.post(`${this.baseUrl}/add`,formData,{ responseType: 'text' });
}

//get Student By Id
getStudentById(id:number):Observable<StudentResponse>
{
return this.httpClient.get<StudentResponse>(`${this.baseUrl}/${id}`);
}
//Update Student
updateStudent(id:number,formData:FormData):Observable<string>
{
return this.httpClient.put(`${this.baseUrl}/${id}`,formData,{ responseType: 'text' });
}

//delete Student
delteStudent(id:number):Observable<string>
{
return this.httpClient.delete(`${this.baseUrl}/${id}`,{ responseType: 'text' });
}
}
