import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartSub = new BehaviorSubject<any[]>([]);
  userUid = "1"

  constructor() {
    this.loadCart(); // Betöltjük a kosarat a localStorage-ból
  }

  getCart() {
    return this.cartSub.asObservable();
  }

  addProduct(product: any) {
    this.cart.push(product);
    this.saveCart(); // Mentjük a kosarat a localStorage-ba
    this.cartSub.next(this.cart);
  }

  deleteProduct(product: any) {
    const productIndex = this.cart.findIndex(p => p.id === product.id);

    if (productIndex !== -1) {
      this.cart.splice(productIndex, 1);
      this.saveCart(); // Mentjük a kosarat a localStorage-ba
      this.cartSub.next(this.cart); 
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart(); // Kosár ürítése és mentése
    this.cartSub.next(this.cart);
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCart() {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
    this.cartSub.next(this.cart); // Frissítjük a BehaviorSubject-et a betöltött kosárral
  }
}