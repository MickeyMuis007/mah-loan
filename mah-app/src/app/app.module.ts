/**
 * Import Modules
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

/**
 * Import Components
 */
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/stakeholders/employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './components/stakeholders/employees/employee-detail/employee-detail.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UserProfileDemo1Component } from './components/themes/bootstrap-themes/user-profile-demo1/user-profile-demo1.component';
import { UserProfileDemo2Component } from './components/themes/bootstrap-themes/user-profile-demo2/user-profile-demo2.component';
import { UserProfileDemo1EditComponent } from './components/themes/edit-themes/user-profile-demo1-edit/user-profile-demo1-edit.component';
import { UserProfileDemo2EditComponent } from './components/themes/edit-themes/user-profile-demo2-edit/user-profile-demo2-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    WelcomeComponent,
    UserProfileDemo1Component,
    UserProfileDemo2Component,
    UserProfileDemo1EditComponent,
    UserProfileDemo2EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
