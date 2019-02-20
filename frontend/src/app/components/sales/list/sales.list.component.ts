import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Client } from 'src/app/models/client.model';

@Component({
    selector: 'sales-list',
    template: `
        <h2>Client list</h2>
        button
        <table class="table">
            <thead>
                <tr>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let client of clients"> 
                    <td>{{client.id}}</td>
                    <td>{{client.name}}</td>
                </tr>
            </tbody>
        </table>

        <h2>Products list</h2>
        button
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
    clients: Client[];

    constructor(private productService: ProductService, private clientService: ClientService) {

    }

    ngOnInit() {
        this.productService.getItems().subscribe(res => this.products = res);
        this.clientService.getItems().subscribe(res => this.clients = res);
    }
}
