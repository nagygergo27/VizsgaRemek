import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { ProductListComponent } from './productlist/productlist.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    ProductListComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
