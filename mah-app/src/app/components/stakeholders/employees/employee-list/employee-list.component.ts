import { Component, Input } from '@angular/core';
import { Employee } from 'src/app/models/stakeholders/employee/employee.model';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
    @Input() model: Employee;
    title: string;

    constructor() {
        this.title = 'Employees';
    }
}
