import { Employee } from '../employee.model';

export interface Sale extends Employee {
    type: string;
    commissionRate: number;
}
