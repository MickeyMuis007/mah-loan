import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/stakeholders/employee/employee.model';
import { PersonalContact } from 'src/app/models/contacts/Impl/personal-contact.model';

@Component({
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
    title = 'Employee Detail';
    @Input() model: Employee;

    ngOnInit() {
        this.initializeModel();
    }

    /**
     * Methods
     */
    private initializeModel () {
        this.model = {
            id: 1,
            name: 'Mike',
            role: 'admin',
            salary: 232,
            dateOfBirth: new Date(),
            startDate: new Date(),
            contact: this.getPersonalContact(),
            endDate: new Date()
        };
    }

    private getPersonalContact () {
        const personalContact = new PersonalContact();
        personalContact.id = 12;
        personalContact.type = 'Personal';
        personalContact.cellNo = '08302382';
        personalContact.postalAddress = 'adf';
        personalContact.residentialAddress = 'sdf';
        personalContact.tel = '';
        return personalContact;
    }

}
