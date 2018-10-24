import { Component } from '@angular/core';

@Component({
    selector: 'welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
    title = "Welcome";
    message = "Welcome to Mikes Loan app";
}