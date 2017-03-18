import { Component, Input } from '@angular/core';

import { MdSnackBar } from '@angular/material';

import {
    Contract, ChildService, CONTRACT_STATUS, ContractService, DAY_OF_WEEK, ContractPlanningDay
} from '../../../../../../../model';

import _ from 'lodash';

@Component({
    selector: 'contract-infos',
    template: require('./contract-infos.html'),
    styles: [require('./contract-infos.scss')]
})
export class ContractInfosComponent {

    @Input()
    public contract: Contract;

    public editingPlanning: boolean = false;
    public DAY_OF_WEEK = DAY_OF_WEEK;

    private hoursPerWeekBackup: number;

    constructor(
        private childService: ChildService,
        private contractService: ContractService,
        private snackBar: MdSnackBar) {
    }

    public save(): void {

        this.contractService.update(this.contract).then(
            () => {
                console.log('OK');
            },
            () => {
                console.log('BURP');
            }
        );

    }

    /**
     * Init a new planning structure
     */
    public initPlanning() {
        this.contract.planning = new Map();
        this.contract.planning[DAY_OF_WEEK.MONDAY] = new ContractPlanningDay();
        this.contract.planning[DAY_OF_WEEK.TUESDAY] = new ContractPlanningDay();
        this.contract.planning[DAY_OF_WEEK.WEDNESDAY] = new ContractPlanningDay();
        this.contract.planning[DAY_OF_WEEK.THURSDAY] = new ContractPlanningDay();
        this.contract.planning[DAY_OF_WEEK.FRIDAY] = new ContractPlanningDay();
        this.hoursPerWeekBackup = this.contract.hoursPerWeek;
        this.contract.hoursPerWeek = 0;
    }

    /**
     * Delete current planning
     */
    public deletePlanning() {
        delete this.contract.planning;
        if (!_.isUndefined(this.hoursPerWeekBackup)) {
            this.contract.hoursPerWeek = this.hoursPerWeekBackup;
        }
    }

    /**
     * Check which field is enabled depending on contract status
     * @param fieldName
     */
    public isDisabled(fieldName: string): boolean {
        if (this.contract.status.toString() !== CONTRACT_STATUS[CONTRACT_STATUS.PREPARING]) {
            return true;
        }
        if (fieldName !== 'hoursPerWeek') {
            return false;
        }
        if (fieldName === 'hoursPerWeek') {
            return !_.isUndefined(this.contract.planning);
        }

    }

}
