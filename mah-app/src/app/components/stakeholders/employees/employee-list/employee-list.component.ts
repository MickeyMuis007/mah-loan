import { Component, Input } from '@angular/core';

@Component({
    selector: 'employees',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
    @Input() model: any;
}