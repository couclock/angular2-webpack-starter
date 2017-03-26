import { DAY_OF_WEEK } from './day-of-week.model';

export class ContractPlanningDay {
    public dayOfWeek: string;
    public startTime: string;
    public endTime: string;

    constructor(dayOfWeek: DAY_OF_WEEK) {
        this.dayOfWeek = DAY_OF_WEEK[dayOfWeek];
    }
}
