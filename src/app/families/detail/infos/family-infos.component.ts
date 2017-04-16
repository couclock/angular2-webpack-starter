import { Component, Input } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { GlobalState } from '../../../global-state.service';

import { Family, FamilyService } from '../../../model';

@Component({
    selector: 'family-infos',
    template: require('./family-infos.html'),
    styles: [require('./family-infos.scss')]
})
export class FamilyInfosComponent {

    @Input()
    public family: Family;

    public errors = { familyNameRequired: false };

    constructor(private _state: GlobalState,
        private snackBar: MdSnackBar,
        private router: Router,
        private familyService: FamilyService) {
    }

    /**
     * Update family name
     * @param newFamilyName
     */
    public saveFamilyName(newFamilyName: string) {
        console.log('newFamilyName : ', newFamilyName);
        if (this.family.name === newFamilyName) {
            return;
        }
        this.family.name = newFamilyName;
        this._updateFamily();
    }

    /**
     * Update family children count
     * @param newChildrenCount
     */
    public saveChildrenCount(newChildrenCount: number) {
        if (this.family.childrenCount === Number(newChildrenCount)) {
            return;
        }
        this.family.childrenCount = newChildrenCount;
        this._updateFamily();
    }

    /**
     * Update family disabled children count
     * @param newDisabledChildrenCount
     */
    public saveDisabledChildrenCount(newDisabledChildrenCount: number) {
        if (this.family.disabledChildrenCount === Number(newDisabledChildrenCount)) {
            return;
        }
        this.family.disabledChildrenCount = newDisabledChildrenCount;
        this._updateFamily();
    }

    /**
     * Launch update request to backend
     */
    private _updateFamily() {
        this.familyService.update(this.family).then(
            (newFamily) => {
                this.family = newFamily;
                this._state.notifyDataChanged(
                    'navbar.title',
                    'Famille "' + newFamily.name + '"'
                );

                this.snackBar.open('Modification enregistrée !', null, {
                    duration: 2000,
                });
                this.router.navigate(['/families',
                    this.family.name,
                    this.family.id]);

            }
        );
    }

}
