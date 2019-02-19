import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'sales-form',
    template: `
        <h2>Sales form</h2>
        <table class="table">
        </table>
      `
})
export class SalesFormComponent {

    constructor(private productService: ProductService, private clientService: ClientService) {

    }

    ngOnInit() {

    }
}
