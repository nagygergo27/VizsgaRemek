import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    ProductlistComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
