import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesListComponent } from './components/sales/list/sales.list.component';
import { SalesFormComponent } from './components/sales/form/sales.form.component';

const routes: Routes = [
  // { path: "", redirectTo: "sales" },
  { path: 'sales', component: SalesListComponent },
  { path: 'sales/create', component: SalesFormComponent },
  { path: 'sales/edit/:id', component: SalesFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }