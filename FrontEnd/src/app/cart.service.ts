import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:any = []
  private cartSub = new BehaviorSubject<any> ([])
  constructor() { }
  getCart() {
    return this.cartSub
  }
  addProduct(products:any) {
    this.cart.push(products)
    this.cartSub.next(this.cart)
  }
  deleteProduct(products: any) { {
      this.cart.splice(products);
      this.cartSub.next(this.cart);
    }
  }
}
