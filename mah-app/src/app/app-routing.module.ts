import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [  
  { path: '', redirectTo: 'home' , pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'employee', loadChildren: './components/stakeholders/employees/employee.module#EmployeeModule' },   //Lazy loading employee module
  { path: 'bootstrap', loadChildren: './components/themes/themes.module#ThemesModule' },                      //Lazy loading bootstrap modules
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
