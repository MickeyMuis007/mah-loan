import { Stakeholder } from "../stakeholder.model";

export interface Employee extends Stakeholder {
    id: number,
    role: string,
    salary: number,
    startDate: Date,
    endDate: Date        
}