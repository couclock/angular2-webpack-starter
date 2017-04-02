import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { FamilyService, ParentService } from '../../../model';
import { Family } from '../../../model/family.model';
import { Parent } from '../../../model/parent.model';

import _ from 'lodash';
import * as moment from 'moment';

@Component({
    selector: 'add-parent',
    templateUrl: './add-parent.html',
    styles: [require('./add-parent.scss')]
})
export class AddParentDialogComponent {

    public family: Family;
    public parent: Parent;

    public deletingParent = false;
    public incomeYears: number[] = [];
    public selectedYear: number;

    constructor(
        private familyService: FamilyService,
        private parentService: ParentService,
        public dialogRef: MdDialogRef<AddParentDialogComponent>) {
        this.family = dialogRef.config.data.family;
        if (dialogRef.config.data.parent && dialogRef.config.data.parent.id) {
            this.parent = _.clone(dialogRef.config.data.parent);
        } else {
            this.parent = new Parent();
            this.parent.name = this.family.name;
            this.parent.income = new Map();
        }
        for (let i = 1; i < 5; i++) {
            this.incomeYears.push(moment().subtract(i, 'years').year());
        }

    }

    /**
     * Save parent : send to backend
     */
    public saveParent(): void {
        console.log('saveParent : ', this.parent);

        if (this.parent && this.parent.id) {
            this.parentService.update(this.parent).then((newParent) => {

                this.dialogRef.close(
                    {
                        actionDone: 'UPDATE',
                        newParent
                    }
                );
            });
        } else {
            this.familyService.addParent(this.family.id, this.parent).then(() => {
                this.dialogRef.close({});
            });
        }
    }

    /**
     * Cancel delete parent process
     */
    public cancelDelete() {
        this.deletingParent = false;
    }

    public askToDeleteParent() {
        this.deletingParent = true;
    }

    /**
     * Delete current parent
     */
    public deleteParent() {
        this.parentService.delete(this.parent.id).then(() => {
            this.dialogRef.close({
                actionDone: 'DELETE'
            });
        });
    }

}
