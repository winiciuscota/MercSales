import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from './base.service';
import { Sale } from '../models/sale.model';

@Injectable()
export class SaleService extends BaseService<Sale> {
    /**
     *
     */

    endPoint: string;

    constructor(protected http: HttpClient) {
        super(http, "sales/");
    }


}
