import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Child, ChildService } from '../../../../model';

@Component({
    selector: 'delete-child',
    templateUrl: './delete-child.html',
    styles: [require('./delete-child.scss')]
})
export class DeleteChildDialogComponent {

    public child: Child;

    constructor(
        private childService: ChildService,
        public dialogRef: MdDialogRef<DeleteChildDialogComponent>) {
        this.child = dialogRef.config.data.child;
    }

    /**
     * Save new child : send to backend
     */
    public deleteChild(): void {

        this.childService.delete(this.child.id).then(() => {
            this.dialogRef.close('DELETE');
        });

    }

}
