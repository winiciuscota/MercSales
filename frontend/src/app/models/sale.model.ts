import { Product } from './product.model';
import { Client } from './client.model';

export class Sale {
    id: number;
    client_id: number;
    items: SaleItem[];
    client: Client;
    total_value: number;

    /**
     *
     */
    constructor() {
        this.items = []
    }
}

export class SaleItem {
    product_id: number;
    productName: string;
    amount: number;
    sale_unit_price: number;
    suggested_unit_price: number;
    multiple: number;

    /**
     *
     */
    constructor(product: Product) {
        this.product_id = product.id;
        this.productName = product.name;
        this.amount = this.multiple = product.multiple ? product.multiple : 1;
        this.sale_unit_price = this.suggested_unit_price = product.unit_price;
    }

    get totalPrice(): number {
        return this.sale_unit_price * this.amount;
    }

    get profitability(): string {
        if (+this.sale_unit_price > this.suggested_unit_price) {
            return "Òtima";
        }
        else if (+this.sale_unit_price > (this.suggested_unit_price * .9)) {
            return "Boa";
        }
        else {
            return "Ruim";
        }
    }

    get validSale(): boolean {
        return this.amount > 0 && (!this.multiple || this.amount % this.multiple == 0);
    }
}
