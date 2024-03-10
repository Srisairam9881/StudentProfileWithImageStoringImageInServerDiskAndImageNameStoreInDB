export interface Student {
id: number;
name: string;
age: string;
dob:string;
gender:string;
email:string;
phoneNo:string;
percentage:String;
imageFileName: string;
}

export class StudentResponse {
student: Student; // Define the structure of your student object
imageUrl: string;

constructor(student: Student, imageUrl: string) {
this.student = student;
this.imageUrl = imageUrl;
}
}
  