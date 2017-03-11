import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Child, Contract } from './index';

@Injectable()
export class ChildService {
    private childrenUrl = '/mv3/children';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    /**
     * Delete one child
     * @param id
     */
    public delete(id: number): Promise<void> {
        const url = `${this.childrenUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    /**
     * Add contract to given childId
     */
    public addContract(childId: number, contract: Contract): Promise<Contract> {

        const url = `${this.childrenUrl}/${childId}/contracts`;

        return this.http.post(url, JSON.stringify(contract), { headers: this.headers })
            .toPromise()
            .then((response) => {
                return response.json() as Contract;
            })
            .catch(this.handleError);
    }

    /**
     * Update supplied child
     * @param child
     */
    public update(child: Child): Promise<Child> {
        const url = `${this.childrenUrl}/${child.id}`;
        return this.http
            .put(url, JSON.stringify(child), { headers: this.headers })
            .toPromise()
            .then((response) => {
                return response.json() as Child;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error.json()); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
