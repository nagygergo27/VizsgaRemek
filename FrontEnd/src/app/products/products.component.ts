import { Component } from '@angular/core';
import { ConfigService } from '../config.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']  
})
export class ProductsComponent {

  products: any[] = [];

  constructor(private config: ConfigService, private cartService: CartService) {
    this.config.getProducts().subscribe(
      (res: any) => {
        this.products = res;
        console.log(this.products);
      }
    );
  }
  addCart(products:any) {
    this.cartService.addProduct(products)
  }

}