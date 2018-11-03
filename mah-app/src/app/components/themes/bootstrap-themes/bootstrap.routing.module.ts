import { Routes, RouterModule } from '@angular/router';
import { UserProfileDemo2Component } from './user-profile-demo2/user-profile-demo2.component';
import { UserProfileDemo1Component } from './user-profile-demo1/user-profile-demo1.component';

export const bootstrapRouter = [
    { path: 'userProfileDemo1', component: UserProfileDemo1Component },
    { path: 'userProfileDemo2', component: UserProfileDemo2Component }
];
