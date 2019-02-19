import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientService } from 'src/services/client.service';
import { ProductService } from 'src/services/product.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ClientService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
