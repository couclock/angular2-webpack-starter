
import { ContractPlanningDay } from './contract-planning-day.model';

export type CONTRACT_STATUS = 'PREPARING' | 'VALIDATED' | 'ACTIVE' | 'DONE';

export const CONTRACT_STATUS = {
    PREPARING: 'PREPARING' as CONTRACT_STATUS,
    VALIDATED: 'VALIDATED' as CONTRACT_STATUS,
    ACTIVE: 'ACTIVE' as CONTRACT_STATUS,
    DONE: 'DONE' as CONTRACT_STATUS
};
export const CONTRACT_STATUS_ORDER = {
    PREPARING: 0,
    VALIDATED: 1,
    ACTIVE: 2,
    DONE: 3
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
