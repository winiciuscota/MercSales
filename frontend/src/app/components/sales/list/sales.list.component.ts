import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
    selector: 'sales-list',
    template: `
        <h2>Sales list</h2>
        <table class="table">
            <thead>
                <tr>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let product of products"> 
                    <td>{{product.id}}</td>
                    <td>{{product.name}}</td>
                    <td>{{product.unit_price}}</td>
                    <td>{{product.multiple}}</td>
                </tr>
            </tbody>
        </table>
      `
})
export class SalesListComponent {

    products: Product[];

    constructor(private productService: ProductService, private clientService: ClientService) {

    }

    ngOnInit() {
        this.productService.getItems().subscribe(res => this.products = res);
    }
}
