import { Component, OnInit } from '@angular/core';
import { GlobalState } from '../../../../../../global-state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MdDialog, MdTabChangeEvent } from '@angular/material';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';

import { FamilyService, Family, Child, Contract, CONTRACT_STATUS } from '../../../../../../model';

import _ from 'lodash';

export enum TABS {
    INFOS,
    CONTRACTS,
    HOLIDAYS,
    HISTORY
}

@Component({
    selector: 'contract-detail',
    template: require('./contract-detail.html'),
    styles: [require('./contract-detail.scss')]
})
export class ContractDetailComponent implements OnInit {

    public familyName: string;
    public familyId: number;
    public childName: string;
    public childId: number;
    public contractId: number;

    public family: Family;
    public child: Child;
    public contract: Contract;

    public mainButton: Ng2FloatBtn;
    public buttons: Ng2FloatBtn[];

    public TABS = TABS;
    public currentTabIndex: number = TABS.INFOS;

    constructor(
        private _state: GlobalState,
        private route: ActivatedRoute,
        private familyService: FamilyService,
        private dialog: MdDialog,
        private router: Router) {

        this.route.params.forEach((params: Params) => {
            this.familyId = Number(params['familyId']);
            this.familyName = params['familyName'];
            this.childId = Number(params['childId']);
            this.childName = params['childName'];
            this.contractId = Number(params['contractId']);
        });

        this.mainButton = {
            color: "accent",
            iconName: "more_vert"
        };
        this.getFamily().then(
            () => {
                this.setButtonsToDisplay();
            }
        );
    }

    public ngOnInit(): void {
        this._state.notifyDataChanged(
            'navbar.title',
            'Contrat n°' + this.contractId + ' de ' + this.childName + ' ' + this.familyName
        );
        this._state.notifyDataChanged(
            'breadcrumb',
            [
                {
                    label: 'Les familles',
                    link: '/families'
                },
                {
                    label: 'Famille "' + this.familyName + '"',
                    link: '/families/' + this.familyName + '/' + this.familyId
                },
                {
                    label: this.childName + ' ' + this.familyName,
                    link: '/families/' + this.familyName + '/' + this.familyId + '/'
                    + this.childName + '/' + this.childId
                }

            ]
        );
    }

    /**
     * Handle tab change to display or not add button
     * @param event
     */
    public tabChanged($event: MdTabChangeEvent) {

        this.currentTabIndex = $event.index;

    }

    /**
     * Handle click on add button to open add modal
     */
    public openDialog() {
        let dialogRef;
        /*
        let config: MdDialogConfig = {
            data: {
                family: this.family,
                child: this.child
            }
        };
                if (this.currentTabIndex === TABS.INFOS) {
                    dialogRef = this.dialog.open(DeleteChildDialogComponent, config);
                }
                if (this.currentTabIndex === TABS.CONTRACTS) {
                    dialogRef = this.dialog.open(AddContractDialogComponent, config);
                }
                if (this.currentTabIndex === 2) {
                    dialogRef = this.dialog.open(AddContactDialogComponent, config);
                }
                */
        dialogRef.afterClosed().subscribe((doneAction) => {
            if (doneAction === 'DELETE') {
                this.router.navigate(['/families', this.familyName, this.familyId]);
            }
            this.getFamily();
        });
    }

    /**
     * Get current family and child and contract
     */
    private getFamily(): Promise<void> {
        return this.familyService.getFamily(this.familyId).then((family: Family) => {
            this.family = family;
            this.child = _.find(family.children, (oneChild: Child) => {
                return oneChild.id === this.childId;
            });
            this.contract = _.find(this.child.contracts, (oneContract: Contract) => {
                return oneContract.id === this.contractId;
            });
        });
    }

    /**
     * Fill this.buttons var depending of current contract status
     */
    private setButtonsToDisplay(): void {

        if (this.contract.status.toString() === CONTRACT_STATUS[CONTRACT_STATUS.PREPARING]) {
            this.buttons = [
                {
                    color: "primary",
                    iconName: "print",
                    onClick: () => {
                        alert("buton 1 clicked");
                    }
                },
                {
                    color: "warn",
                    iconName: "delete",
                    onClick: () => {
                        alert("buton 2 clicked");
                    }
                }
            ];
        } else if (this.contract.status.toString() === CONTRACT_STATUS[CONTRACT_STATUS.VALIDATED]) {
            this.buttons = [
                {
                    color: "warn",
                    iconName: "delete",
                    onClick: () => {
                        alert("buton 2 clicked");
                    }
                }
            ];
        } else if (this.contract.status.toString() === CONTRACT_STATUS[CONTRACT_STATUS.ACTIVE]) {
            this.buttons = [
                {
                    color: "warn",
                    iconName: "stop",
                    onClick: () => {
                        alert("buton 2 clicked");
                    }
                }
            ];
        } else if (this.contract.status.toString() === CONTRACT_STATUS[CONTRACT_STATUS.DONE]) {
            this.buttons = [
                {
                    color: "warn",
                    iconName: "delete",
                    onClick: () => {
                        alert("buton 2 clicked");
                    }
                }
            ];
        }

    }
}
