import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../services/product.service";
import { ClientService } from "../../../services/client.service";
import { Product } from "../../../models/product.model";
import { Client } from "../../../models/client.model";
import { DatePipe } from '@angular/common';

@Component({
    selector: "app-test",
    templateUrl: "./test.component.html",
    styleUrls: ["./test.component.scss"]
})
export class TestComponent implements OnInit {

    clients: Client[]
    products: Product[]

    constructor(private clientService: ClientService,
        private productService: ProductService) {

    }



    ngOnInit() {

    }


}