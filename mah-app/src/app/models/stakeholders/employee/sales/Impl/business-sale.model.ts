import { Sale } from '../sale.model';

export class BusinessSale implements Sale {
    id: number;
    name: string;
    role: string;
    salary: number;
    startDate: Date;
    endDate: Date;
    type: string;
    commissionRate: number;    
}