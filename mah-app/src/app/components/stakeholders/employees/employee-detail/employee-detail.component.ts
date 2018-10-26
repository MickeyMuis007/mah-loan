import { Component } from '@angular/core';

@Component({
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent{
    title = 'Employee Detail';
    model = { name: "Emp1" };
}
