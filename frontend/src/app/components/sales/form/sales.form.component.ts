import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Client } from 'src/app/models/client.model';
import { SaleItem, Sale } from 'src/app/models/sale.model';
import { SaleService } from 'src/app/services/sale.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'sales-form',
    templateUrl: 'sales.form.component.html'
})
export class SalesFormComponent {

    products: Product[];
    clients: Client[];
    selectedProductId: number = null;
    sale: Sale = new Sale();

    constructor(private productService: ProductService,
        protected route: ActivatedRoute,
        private clientService: ClientService,
        private saleService: SaleService,
        private toastrService: ToastrService) {
    }

    ngOnInit() {

        this.productService.getItems().subscribe(res => {
            this.products = res;
            this.route.params.subscribe(p => {
                this.sale.id = +p["id"] || null;
                if (this.sale.id) {
                    this.saleService.getItem(this.sale.id).subscribe(res => this.setSale(res));
                }
            });
        });
        this.clientService.getItems().subscribe(res => this.clients = res);

    }

    setSale(sale: Sale) {
        this.sale = sale;
        this.sale.items = this.sale.items.map(x => {
            let product = this.products.find(y => y.id == x.product_id);
            let saleItem = new SaleItem(product)
            saleItem.amount = x.amount;
            saleItem.suggested_unit_price = x.suggested_unit_price;
            saleItem.sale_unit_price = x.sale_unit_price;
            return saleItem;
        });
    }

    addProduct() {
        // If there is a selected product which is not already added
        if (this.selectedProductId && !this.sale.items.find(x => x.product_id == this.selectedProductId)) {
            let product = this.products.find(x => x.id == this.selectedProductId);
            let saleItem = new SaleItem(product);
            this.sale.items.push(saleItem);
            this.selectedProductId = null;
        }
    }

    removeItem(saleItem: SaleItem) {
        let index = this.sale.items.indexOf(saleItem);
        this.sale.items.splice(index, 1);
    }


    get totalValue(): number {
        return this.sale.items.map(x => x.totalPrice).reduce((sum, current) => sum + current);
    }

    submit() {
        var result = this.sale.id
            ? this.saleService.editItem(this.sale.id, this.sale)
            : this.saleService.createItem(this.sale);

        var msg = this.sale.id ? "Venda editdada com sucesso!" : "Venda efetuada com sucesso!";
        result.subscribe(res => {
            this.setSale(res);
            this.toastrService.success(msg);
        }, err => this.toastrService.error(err));
    }

    get disabled(): boolean {
        return !this.sale.client_id || this.sale.items.length <= 0 || this.sale.items.some(x => !x.validSale);
    }
}
