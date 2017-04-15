import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Contract, ContractService } from '../../../../../../../model';

@Component({
    selector: 'incomplete-contract',
    template: require('./incomplete-contract.html'),
    // styles: [require('./incomplete-contract.scss')]
})
export class IncompleteContractDialogComponent implements OnInit {

    public contract: Contract;
    public messages: string[] = [];

    constructor(public dialogRef: MdDialogRef<IncompleteContractDialogComponent>,
            private contractService: ContractService,
            @Inject(MD_DIALOG_DATA) private data: any) {
        this.contract = data.contract;
    }

    public ngOnInit() {

        this.contractService.explainMissingData(this.contract.id).then(
            (newMessages) => {
                this.messages = newMessages;
            }
        );

    }

}
