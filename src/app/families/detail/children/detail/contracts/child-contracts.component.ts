import { Component, Input } from '@angular/core';

import { Child, Family, Contract, CONTRACT_STATUS_ORDER } from '../../../../../model';

import _ from 'lodash';

@Component({
    selector: 'child-contracts',
    template: require('./child-contracts.html'),
    styles: [require('./child-contracts.scss')]
})
export class ChildContractsComponent {

    public child: Child;

    @Input()
    public family: Family;

    public orderedContractList: Contract[];

    @Input('child')
    set setChild(val) {
        console.log('set : ', val);
        this.child = val;
        if (_.isUndefined(val)) {
            return;
        }
        this.orderedContractList = _.clone(this.child.contracts).sort(
            function(c1: Contract, c2: Contract) {
                console.log('comparator : ', c1, c2);
                let result = 0;
                if (c1.status === c2.status) {
                    result = (c1.fromDate < c2.fromDate?-1:1);
                } else {
                    result = CONTRACT_STATUS_ORDER[c1.status] < CONTRACT_STATUS_ORDER[c2.status] ? -1:1;
                }
                console.log('result : ', result);
                return result;
            }
        );
    }

}
