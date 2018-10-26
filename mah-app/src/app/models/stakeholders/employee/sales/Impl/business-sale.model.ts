import { Sale } from '../sale.model';
import { Contact } from "src/app/models/contacts/contact.model";

export class BusinessSale implements Sale {
    id: number;
    name: string;
    role: string;
    salary: number;
    startDate: Date;
    endDate: Date;
    type: string;
    commissionRate: number;    
    dateOfBirth: Date;
    contact: Contact;
}