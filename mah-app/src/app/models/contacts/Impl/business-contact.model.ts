import { Contact } from "../contact.model";
import { Address } from "../helpers/address.model";

export class BusinessContact implements Contact {
    id: number;
    type: string;
    fax: string;
    tel: string;
    email: string;  
    address: Address;  
}