import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

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
        public dialogRef: MdDialogRef<DeleteChildDialogComponent>,
        @Inject(MD_DIALOG_DATA) private data: any) {
        this.child = data.child;
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
