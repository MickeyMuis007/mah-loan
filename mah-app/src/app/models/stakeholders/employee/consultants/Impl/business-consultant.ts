import { Consultant } from '../consultant.model';

export class BusinessConsultant implements Consultant {
    id: number;
    name: string;
    role: string;
    salary: number;
    startDate: Date;
    endDate: Date;
    type: string;
}