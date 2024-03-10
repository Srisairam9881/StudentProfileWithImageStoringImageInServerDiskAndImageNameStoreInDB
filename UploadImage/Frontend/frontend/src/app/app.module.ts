import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListStudentsComponent } from './components/list-students/list-students.component';
import { GetStudentComponent } from './components/get-student/get-student.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';

@NgModule({
declarations: [
AppComponent,
ListStudentsComponent,
GetStudentComponent,
AddStudentComponent,
UpdateStudentComponent
],
imports: [
BrowserModule,
AppRoutingModule,
HttpClientModule,
FormsModule
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }
