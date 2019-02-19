import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import urljoin from "url-join";
import { Product } from 'src/models/product.model';
import { BaseService } from './base.service';

@Injectable()
export class ProductService extends BaseService<Product> {
    /**
     *
     */

    endPoint: string;

    constructor(protected http: HttpClient) {
        super(http, urljoin(environment.apiUrl, "products"));
    }


}
