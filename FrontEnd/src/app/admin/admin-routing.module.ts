import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent} from './users/users.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'users', component: UsersComponent},
  { path: 'productlist', component: ProductlistComponent},
  { path: 'orders', component: OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
