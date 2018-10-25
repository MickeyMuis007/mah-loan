import { Consultant } from '../consultant.model';

export class EnquiryConsultant implements Consultant {
    id: number;
    name: string;
    role: string;
    salary: number;
    startDate: Date;
    endDate: Date;
    type: string;
}