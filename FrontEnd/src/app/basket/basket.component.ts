import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-basket',
  standalone: false,
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {
  cart:any=[]
  product: any;
    constructor(private cartServices:CartService) {
      this.cartServices.getCart().subscribe(
        (res)=>this.cart=res
      )
    }
    deleteProduct(products:any) {
      this.cartServices.deleteProduct(products)
    }
}
