import { Component } from '@angular/core';


@Component({
    templateUrl: './employee-edit.component.html',
    styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent {
    model = {
        name: 'Mike'
    };
}
