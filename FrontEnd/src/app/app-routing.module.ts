import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { BasketComponent } from './basket/basket.component';
import { UsComponent } from './us/us.component';
import { UsersComponent } from './users/users.component';
import { ProductListComponent } from './productlist/productlist.component';
import { OrdersComponent } from './orders/orders.component';
import { NewComponent } from './new/new.component';



const routes: Routes = [
  { path: '', component:HomeComponent  },
  { path: 'products', component: ProductsComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'new', component: NewComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'users', component: UsersComponent },
  { path: 'productlist', component: ProductListComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'us', component: UsComponent },
  // { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
