import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import urljoin from "url-join";
import { BaseService } from './base.service';
import { Client } from 'src/models/client.model';

@Injectable()
export class ClientService extends BaseService<Client> {
    /**
     *
     */

    endPoint: string;

    constructor(protected http: HttpClient) {
        super(http, urljoin(environment.apiUrl, "clients"));
    }


}
