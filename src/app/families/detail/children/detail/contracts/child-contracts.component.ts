import { Component, Input } from '@angular/core';

import { Child, Family } from '../../../../../model';

@Component({
    selector: 'child-contracts',
    template: require('./child-contracts.html'),
    styles: [require('./child-contracts.scss')]
})
export class ChildContractsComponent {

    @Input()
    public child: Child;
    @Input()
    public family: Family;

}
