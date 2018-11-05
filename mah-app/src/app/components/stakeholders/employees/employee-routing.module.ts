/**
 * Author: Michael Alan Hendricks
 * Date Modified: 04/11/2018
 * Descripttion: This route constant handles all the route that involve employees in this sub directories.
 */

import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';

/* Import components */
import { EmployeeComponent } from './employee.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const employeeRoutes: Routes = [
    { path: '', component: EmployeeComponent },
    { path: 'detail', component: EmployeeDetailComponent },
    { path: 'edit', component: EmployeeEditComponent },
    { path: 'list', component: EmployeeListComponent }
]

@NgModule({
    imports: [RouterModule.forChild(employeeRoutes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule{
    
}