import { Component } from '@angular/core';

@Component({
selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
title = 'frontend';
currentYear!: number;
constructor() { }
ngOnInit(): void {
this.currentYear = new Date().getFullYear();
}
}
