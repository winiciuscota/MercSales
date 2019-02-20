import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Client } from 'src/app/models/client.model';
import { SaleItem } from 'src/app/models/sale-item.model';


@Component({
    selector: 'sales-form',
    templateUrl: 'sales.form.component.html'
})
export class SalesFormComponent {

    products: Product[];
    clients: Client[];
    item: any = {};
    selectedProductId: number;
    saleItems: SaleItem[] = [];
    constructor(private productService: ProductService, private clientService: ClientService) {

    }

    ngOnInit() {
        this.productService.getItems().subscribe(res => this.products = res);
        this.clientService.getItems().subscribe(res => this.clients = res);
    }

    addProduct() {
        // If there is a selected product which is not already added
        if (this.selectedProductId && !this.saleItems.find(x => x.productId == this.selectedProductId)) {
            let product = this.products.find(x => x.id == this.selectedProductId);
            let saleItem = new SaleItem(product);
            this.saleItems.push(saleItem);
        }
    }


    get totalValue() : number {
        return this.saleItems.map(x => x.totalPrice).reduce((sum, current) => sum + current );
    }
}
