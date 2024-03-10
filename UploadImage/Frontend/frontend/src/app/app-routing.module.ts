import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStudentsComponent } from './components/list-students/list-students.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { GetStudentComponent } from './components/get-student/get-student.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';

const routes: Routes = [
{path:'students',component:ListStudentsComponent},
{path:'create-student',component:AddStudentComponent},
{path:'',redirectTo:'students',pathMatch:'full'},
{path:'update-student/:id',component:UpdateStudentComponent},
{path:'student-details/:id',component:GetStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
