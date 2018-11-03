import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './components/stakeholders/employees/employee-list/employee-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UserProfileDemo1Component } from './components/themes/bootstrap-themes/user-profile-demo1/user-profile-demo1.component';
import { UserProfileDemo2Component } from './components/themes/bootstrap-themes/user-profile-demo2/user-profile-demo2.component';
import { UserProfileDemo1EditComponent } from './components/themes/edit-themes/user-profile-demo1-edit/user-profile-demo1-edit.component';
import { UserProfileDemo2EditComponent } from './components/themes/edit-themes/user-profile-demo2-edit/user-profile-demo2-edit.component';
import { EmployeeDetailComponent } from './components/stakeholders/employees/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './components/stakeholders/employees/employee-edit/employee-edit.component';
import { BootstrapDashboard } from './components/themes/bootstrap-themes/bootstrap-dashboard.component';

const routes: Routes = [
  { path: 'employee', component: EmployeeListComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: '/' , pathMatch: 'full' },
  { path: 'bootstrap', component: BootstrapDashboard, children: [{path:  'user', component: UserProfileDemo1Component}]},
  { path: 'bootstrap/userProfileDemo1', component: UserProfileDemo1Component },
  { path: 'bootstrap/userProfileDemo2', component: UserProfileDemo2Component },
  { path: 'edit/userProfileDemo1Edit', component: UserProfileDemo1EditComponent },
  { path: 'edit/userProfileDemo2Edit', component: UserProfileDemo2EditComponent },
  { path: 'employeeDetail', component: EmployeeDetailComponent },
  { path: 'employeeEdit', component: EmployeeEditComponent },
  { path: '**', redirectTo: '' }
];

const childRoute: Routes = [
  {
    path: 'bootstrap',
    component: BootstrapDashboard,
    children: [
      {
        path: 'userProfileDemo11',
        component: UserProfileDemo1Component
      }
    ]

  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
