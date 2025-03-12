import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartSub = new BehaviorSubject<any[]>([]);

  constructor() { }

  getCart() {
    return this.cartSub.asObservable();
  }

  addProduct(product: any) {
    this.cart.push(product);
    this.cartSub.next(this.cart);
  }

  deleteProduct(product: any) {
    const productIndex = this.cart.findIndex(p => p.id === product.id);
    
    if (productIndex !== -1) {
      this.cart.splice(productIndex, 1);
      this.cartSub.next(this.cart); 
    }
  }
}
