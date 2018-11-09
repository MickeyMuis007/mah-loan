import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home' , pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'employee', loadChildren: './components/stakeholders/employees/employee.module#EmployeeModule' },
  { path: 'bootstrap', loadChildren: './components/themes/themes.module#ThemesModule' },
  { path: 'authentication', loadChildren: './components/authentication/authentication.module#AuthenticationModule'},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
