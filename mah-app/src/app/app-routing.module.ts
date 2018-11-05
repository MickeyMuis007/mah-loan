import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileDemo1Component } from './components/themes/bootstrap-themes/user-profile-demo1/user-profile-demo1.component';
import { UserProfileDemo2Component } from './components/themes/bootstrap-themes/user-profile-demo2/user-profile-demo2.component';
import { UserProfileDemo1EditComponent } from './components/themes/edit-themes/user-profile-demo1-edit/user-profile-demo1-edit.component';
import { UserProfileDemo2EditComponent } from './components/themes/edit-themes/user-profile-demo2-edit/user-profile-demo2-edit.component';
import { BootstrapDashboard } from './components/themes/bootstrap-themes/bootstrap-dashboard.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [  
  { path: 'Home', component: HomeComponent },
  { path: '', redirectTo: 'Home' , pathMatch: 'full' },
  { path: 'bootstrap', component: BootstrapDashboard, children: [{path:  'user', component: UserProfileDemo1Component}]},
  { path: 'bootstrap/userProfileDemo1', component: UserProfileDemo1Component },
  { path: 'bootstrap/userProfileDemo2', component: UserProfileDemo2Component },
  { path: 'edit/userProfileDemo1Edit', component: UserProfileDemo1EditComponent },
  { path: 'edit/userProfileDemo2Edit', component: UserProfileDemo2EditComponent },
  { path: 'employee', loadChildren: './components/stakeholders/employees/employee.module#EmployeeModule' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
