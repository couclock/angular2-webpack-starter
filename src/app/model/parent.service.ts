import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Parent } from './index';

@Injectable()
export class ParentService {
    private parentsUrl = '/mv3/parents';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    /**
     * Update parent
     */
    public update(parent: Parent): Promise<Parent> {
        const url = `${this.parentsUrl}/${parent.id}`;

        return this.http
            .put(url, JSON.stringify(parent), { headers: this.headers })
            .toPromise()
            .then((res) => res.json() as Parent)
            .catch(this.handleError);
    }

    /**
     * Delete one parent
     * @param id
     */
    public delete(id: number): Promise<void> {
        const url = `${this.parentsUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        let errorObj = error.json();
        return Promise.reject(errorObj);
    }
}
