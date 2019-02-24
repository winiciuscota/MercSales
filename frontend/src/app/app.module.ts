import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientService } from './services/client.service';
import { ProductService } from './services/product.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SalesListComponent } from './components/sales/list/sales.list.component';
import { SalesFormComponent } from './components/sales/form/sales.form.component';
import { SaleService } from './services/sale.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    SalesListComponent,
    SalesFormComponent
  ],
  imports: [
    // RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [ClientService, ProductService, SaleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
