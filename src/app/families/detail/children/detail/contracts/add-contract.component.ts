import { Component, Input } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';

import { Child, Contract, CONTRACT_STATUS, ChildService } from '../../../../../model';

@Component({
    selector: 'add-contract',
    template: require('./add-contract.html'),
    // styles: [require('./add-contract.scss')]
})
export class AddContractDialogComponent {

    @Input()
    public child: Child;

    public contract: Contract = new Contract();

    constructor(private childService: ChildService,
        public dialogRef: MdDialogRef<AddContractDialogComponent>,
        private snackBar: MdSnackBar) {
        this.child = dialogRef.config.data.child;
    }

    /**
     * Save contract : send to backend
     */
    public saveContract(newFromDate: Date, newToDate: Date,
        newHolidayWeekCount: number, newHoursPerWeek: number): void {

        let contract: Contract = {
            status: CONTRACT_STATUS.PREPARING,
            fromDate: newFromDate,
            toDate: newToDate,
            holidayWeekCount: newHolidayWeekCount,
            hoursPerWeek: newHoursPerWeek
        };
        this.childService.addContract(this.child.id, contract).then(
            () => {
                this.dialogRef.close('CREATE_CONTRACT');
            },
            (error) => {
                this.snackBar.open(error.message, null, {
                    duration: 3000,
                    extraClasses: ['error-snack-bar']
                });
            });

    }

}
