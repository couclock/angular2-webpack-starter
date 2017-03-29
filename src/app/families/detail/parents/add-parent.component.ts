import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { FamilyService, ParentService } from '../../../model';
import { Family } from '../../../model/family.model';
import { Parent } from '../../../model/parent.model';

@Component({
    selector: 'add-parent',
    templateUrl: './add-parent.html',
})
export class AddParentDialogComponent {

    public family: Family;
    public parent: Parent;

    constructor(
        private familyService: FamilyService,
        private parentService: ParentService,
        public dialogRef: MdDialogRef<AddParentDialogComponent>) {
        this.family = dialogRef.config.data.family;
        this.parent = new Parent();
        this.parent.name = this.family.name;
    }

    /**
     * Save parent : send to backend
     */
    public saveParent(): void {

        if (this.parent && this.parent.id) {
            this.parentService.update(this.parent).then(() => {
                this.dialogRef.close();
            });
        } else {
            this.familyService.addParent(this.family.id, this.parent).then(() => {
                this.dialogRef.close();
            });
        }
    }

    /**
     * Delete current parent
     */
    public deleteParent() {
        this.parentService.delete(this.parent.id).then(() => {
            this.dialogRef.close('DELETE');
        });
    }

}
