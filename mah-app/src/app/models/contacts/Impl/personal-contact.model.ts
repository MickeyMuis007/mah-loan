import { Contact } from "../contact.model";
import { Address } from "../helpers/address.model";

export class PersonalContact implements Contact {
    id: number;
    type: string;
    tel?: string;
    cellNo?: string;
    postalAddress?: Address;
    residentialAddress?: Address;
}