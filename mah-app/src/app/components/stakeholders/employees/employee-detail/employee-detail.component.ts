import { Component, Input } from '@angular/core';
import { Employee } from 'src/app/models/stakeholders/employee/employee.model';

@Component({
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent{
    title = 'Employee Detail';
    @Input() model: Employee;
}
