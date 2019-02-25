import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from './base.service';
import { Client } from '../models/client.model';

@Injectable()
export class ClientService extends BaseService<Client> {
    /**
     *
     */

    endPoint: string;

    constructor(protected http: HttpClient) {
        super(http, "/api/clients/");
    }


}
