import { Employee } from '../employee.model';

export interface Consultant extends Employee {
    type: string;
}
