
import { ContractPlanningDay } from './contract-planning-day.model';

export enum CONTRACT_STATUS {
    PREPARING,
    VALIDATED,
    ACTIVE,
    DONE
}

export class Contract {
    public id?: number;
    public status: CONTRACT_STATUS;
    public fromDate?: Date;
    public toDate?: Date;
    public pricePerMonth?: number;
    public holidayWeekCount?: number;
    public hoursPerWeek?: number;
    public monthlyAmount?: number;
    public planning?: ContractPlanningDay[];

}
