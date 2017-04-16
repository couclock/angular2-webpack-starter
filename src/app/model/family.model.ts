
import { Child, Parent, Contact } from '.';

export class Family {
    public id?: number;
    public name: string;
    public children?: Child[];
    public parents?: Parent[];
    public contacts?: Contact[];
    public childrenCount?: number;
    public disabledChildrenCount?: number;
}
