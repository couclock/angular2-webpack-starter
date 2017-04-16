import { Component, Input, Inject } from '@angular/core';
import { MdDialogRef, MdSnackBar, MD_DIALOG_DATA } from '@angular/material';

import { Child, Contract, CONTRACT_STATUS, ChildService } from '../../../../../model';

@Component({
    selector: 'add-contract',
    template: require('./add-contract.html'),
    styles: [require('./add-contract.scss')]
})
export class AddContractDialogComponent {

    @Input()
    public child: Child;

    public contract: Contract = new Contract();

    constructor(private childService: ChildService,
        public dialogRef: MdDialogRef<AddContractDialogComponent>,
        private snackBar: MdSnackBar,
        @Inject(MD_DIALOG_DATA) private data: any) {
        this.child = data.child;
        this.contract.status = CONTRACT_STATUS.PREPARING;
    }

    /**
     * Save contract : send to backend
     */
    public saveContract(): void {

        this.childService.addContract(this.child.id, this.contract).then(
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
