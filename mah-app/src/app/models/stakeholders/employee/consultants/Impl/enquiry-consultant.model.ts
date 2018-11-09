import { Consultant } from '../consultant.model';
import { Contact } from 'src/app/models/contacts/contact.model';

export class EnquiryConsultant implements Consultant {
    id: number;
    name: string;
    role: string;
    salary: number;
    startDate: Date;
    endDate: Date;
    type: string;
    dateOfBirth: Date;
    contact: Contact;
}
