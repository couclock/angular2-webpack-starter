import { Component, Input } from '@angular/core';

import { Family } from '../../../model/family.model';

@Component({
    selector: 'children-list',
    template: require('./children-list.html'),
    styles: [require('./children-list.scss')]
})
export class ChildrenListComponent {

    @Input()
    public family: Family;

}
