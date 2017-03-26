import { Component, Input } from '@angular/core';

import { MdSnackBar, MdDialog, MdDialogConfig } from '@angular/material';

import { IncompleteContractDialogComponent } from './incomplete-contract.component';
import {
    Contract, ChildService, CONTRACT_STATUS, ContractService, DAY_OF_WEEK, ContractPlanningDay
} from '../../../../../../../model';

import _ from 'lodash';
import * as moment from 'moment';

@Component({
    selector: 'contract-infos',
    template: require('./contract-infos.html'),
    styles: [require('./contract-infos.scss')]
})
export class ContractInfosComponent {

    @Input()
    public contract: Contract;

    private hoursPerWeekBackup: number;

    constructor(
        private childService: ChildService,
        private contractService: ContractService,
        private snackBar: MdSnackBar,
        private dialog: MdDialog) {

        console.log('constructor : ', this.contract);

    }

    public explainIncompleteContract() {

        let config: MdDialogConfig = {
            data: {
                contract: this.contract
            }
        };

        let dialogRef = this.dialog.open(IncompleteContractDialogComponent, config);

        dialogRef.afterClosed().subscribe(() => {
            console.log('close');
        });
    }

    public save(): Promise<Contract> {

        console.log('save contract : ', this.contract);

        return this.contractService.update(this.contract).then(
            (updatedContract) => {
                console.log('save updatedContract : ', updatedContract);
                this.contract = updatedContract;
                return this.contract;
            },
            (error) => {
                this.snackBar.open(error.message, null, {
                    duration: 3000,
                    extraClasses: ['error-snack-bar']
                });
            }
        );

    }

    /**
     * Init a new planning structure
     */
    public initPlanning() {

        this.contract.planning = [];
        this.contract.planning.push(new ContractPlanningDay(DAY_OF_WEEK.MONDAY));
        this.contract.planning.push(new ContractPlanningDay(DAY_OF_WEEK.TUESDAY));
        this.contract.planning.push(new ContractPlanningDay(DAY_OF_WEEK.WEDNESDAY));
        this.contract.planning.push(new ContractPlanningDay(DAY_OF_WEEK.THURSDAY));
        this.contract.planning.push(new ContractPlanningDay(DAY_OF_WEEK.FRIDAY));
        this.hoursPerWeekBackup = this.contract.hoursPerWeek;
        this.contract.hoursPerWeek = 0;

    }

    /**
     * Delete current planning
     */
    public deletePlanning() {
        delete this.contract.planning;
        this.save().then(() => {
            if (!_.isUndefined(this.hoursPerWeekBackup)) {
                this.contract.hoursPerWeek = this.hoursPerWeekBackup;
            } else {
                this.contract.hoursPerWeek = 0;
            }
        });
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

    /**
     * Get french label on a DAY_OF_WEEK
     * @param oneDay
     */
    public getDayLabel(oneDayOfWeek: string) {
        return moment.weekdays(moment.localeData('en').weekdaysParse(oneDayOfWeek, 'dddd', false));
    }

    public customTrackBy(index: number, obj: any): any {
        return index;
    }

    /**
     * Check whether current planning is empty
     */
    public isPlanningEmpty(): boolean {
        let result: boolean = false;
        if (_.isUndefined(this.contract) || _.isUndefined(this.contract.planning)) {
            result = true;
        } else if (this.contract.planning.length === 0) {
            result = true;
        }

        return result;

    }
}
