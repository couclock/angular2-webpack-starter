import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contract } from '.';

@Injectable()
export class ContractService {
    private contractsUrl = 'app/contracts';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) {

    }

    public update(contract: Contract): Promise<Contract> {
        const url = `${this.contractsUrl}/${contract.id}`;
        return this.http
            .put(url, JSON.stringify(contract), { headers: this.headers })
            .toPromise()
            .then(() => contract as Contract)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        let errorObj = error.json();
        return Promise.reject(errorObj);
    }
}
