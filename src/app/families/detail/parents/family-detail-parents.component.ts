import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { AddParentDialogComponent } from './add-parent.component';

import { Family, Parent } from '../../../model';

@Component({
    selector: 'family-detail-parents',
    template: require('./family-detail-parents.html'),
    styles: [require('./family-detail-parents.scss')]
})
export class FamilyDetailParentsComponent {

    @Input()
    public family: Family;

    constructor(private dialog: MdDialog) {
    }

    public editParent(idx: number, parent: Parent) {
        let config: MdDialogConfig = {
            data: {
                family: this.family,
                parent
            }
        };
        let dialogRef = this.dialog.open(AddParentDialogComponent, config);
        dialogRef.afterClosed().subscribe((returnObj) => {
            if (returnObj.actionDone === 'UPDATE') {
                this.family.parents[idx] = returnObj.newParent;
            } else if (returnObj.actionDone === 'DELETE') {
                this.family.parents.splice(idx, 1);
            }
        });
    }

}
