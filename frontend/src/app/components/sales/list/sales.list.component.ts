import { Component } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';
import { Sale } from 'src/app/models/sale.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sales-list',
    template: `
        <h2>Vendas</h2>
        <button class="btn btn-sm btn-success" [routerLink]="['create']">Criar</button>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Cliente</th>
                    <th>Valor Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let sale of sales"> 
                    <td>{{sale.id}}</td>
                    <td>{{sale.client.name}}</td>
                    <td>R$ {{sale.total_value | number : '1.2-2'}}</td>
                    <td><button class="btn btn-sm btn-info" [routerLink]="['edit', sale.id]">Editar</button></td>
                    <td><button class="btn btn-sm btn-danger" (click)="removeSale(sale.id)">Remover</button></td>
                </tr>
            </tbody>
        </table>
      `
})
export class SalesListComponent {

    sales: Sale[];

    constructor(private saleService: SaleService, private toastrService: ToastrService) {

    }

    ngOnInit() {
        this.saleService.getItems().subscribe(res => this.sales = res);
    }

    removeSale(saleId: number) {
        this.saleService.removeItem(saleId).subscribe(res =>
            this.toastrService.success("Venda " + res.id + "removida com sucesso!"));
    }
}
