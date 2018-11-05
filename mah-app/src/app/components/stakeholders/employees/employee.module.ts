/**
 * Author: Michael Alan Hendricks
 * Date Modified: 04/11/2018
 */

/* Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';

/* Components */
import { EmployeeComponent } from './employee.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';


@NgModule({
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        FormsModule
    ],
    declarations: [
        EmployeeComponent,
        EmployeeDetailComponent,
        EmployeeEditComponent,
        EmployeeListComponent
    ],
    providers: [

    ]
})
export class EmployeeModule {

}