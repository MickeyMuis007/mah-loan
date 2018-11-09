import { Component, OnInit } from '@angular/core';
import { FundiUser } from 'src/app/models/login/fundi-user.model';

@Component({
    templateUrl: './user-profile-demo1-edit.component.html',
    styleUrls: ['./user-profile-demo1-edit.component.css']
})
export class UserProfileDemo1EditComponent implements OnInit {
    model: FundiUser;
    ngOnInit() {
        this.model = {
            userId: 'mike007',
            name: 'Michael Hendricks',
            email: 'mike007@gmail.com',
            phone: '123 3432 7777',
            profession: 'Web Developer',
            imageUrl: 'assets/images/default.png'
         };

    }
}
