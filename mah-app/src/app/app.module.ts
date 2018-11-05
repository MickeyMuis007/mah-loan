/**
 * Import Modules
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { EmployeeModule } from './components/stakeholders/employees/employee.module';

/**
 * Import Components
 */
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UserProfileDemo1Component } from './components/themes/bootstrap-themes/user-profile-demo1/user-profile-demo1.component';
import { UserProfileDemo2Component } from './components/themes/bootstrap-themes/user-profile-demo2/user-profile-demo2.component';
import { UserProfileDemo1EditComponent } from './components/themes/edit-themes/user-profile-demo1-edit/user-profile-demo1-edit.component';
import { UserProfileDemo2EditComponent } from './components/themes/edit-themes/user-profile-demo2-edit/user-profile-demo2-edit.component';
import { BootstrapDashboard } from './components/themes/bootstrap-themes/bootstrap-dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    UserProfileDemo1Component,
    UserProfileDemo2Component,
    UserProfileDemo1EditComponent,
    UserProfileDemo2EditComponent,
    BootstrapDashboard,
    NavBarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
