import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from '../models/product.model';
import { BaseService } from './base.service';

@Injectable()
export class ProductService extends BaseService<Product> {
    /**
     *
     */

    endPoint: string;

    constructor(protected http: HttpClient) {
        super(http, "/api/products/");
    }


}
