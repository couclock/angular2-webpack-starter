import { Component, Input } from '@angular/core';

import { MdSnackBar } from '@angular/material';

import {
    Contract, ChildService, CONTRACT_STATUS, ContractService
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

    constructor(
        private childService: ChildService,
        private contractService: ContractService,
        private snackBar: MdSnackBar) {
    }

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
