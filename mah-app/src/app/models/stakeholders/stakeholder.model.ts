import { Contact } from "../contacts/contact.model";

export interface Stakeholder {
    name: string;
    dateOfBirth: Date;
    contact: Contact;
}