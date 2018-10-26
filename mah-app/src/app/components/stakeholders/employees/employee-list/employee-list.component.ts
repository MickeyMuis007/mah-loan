import { Component, Input } from '@angular/core';
import { Employee } from 'src/app/models/stakeholders/employee/employee.model';

@Component({
    selector: 'employees',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
    @Input() model: any;
}