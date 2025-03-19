import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartSub = new BehaviorSubject<any[]>([]);

  constructor() {
    this.loadCart();
  }

  getCart() {
    return this.cartSub.asObservable();
  }

  addProduct(product: any) {
    const existingProductIndex = this.cart.findIndex(p => p.id === product.id);

    if (existingProductIndex !== -1) {
      this.cart[existingProductIndex].quantity++; // Ha már létezik a termék, csak a mennyiséget növeljük
    } else {
      product.quantity = 1;
      this.cart.push(product); // Ha új termék, hozzáadjuk
    }

    this.updateCart(); // Kosár frissítése
  }

  deleteProduct(product: any) {
    const productIndex = this.cart.findIndex(p => p.id === product.id);
    if (productIndex !== -1) {
      if (this.cart[productIndex].quantity > 1) {
        this.cart[productIndex].quantity--; // Csökkentjük a mennyiséget
      } else {
        this.cart.splice(productIndex, 1); // Ha 1 darab van, eltávolítjuk a terméket
      }
    }

    this.updateCart(); // Kosár frissítése
  }

  clearCart() {
    this.cart = [];
    this.updateCart(); // Kosár kiürítése
  }

  // Kosár darabszámának kiszámítása
  getCartItemCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0); // Összes mennyiség kiszámítása
  }

  private updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart)); // Frissítjük a localStorage-t
    this.cartSub.next(this.cart); // Frissítjük az Observable-t
  }

  private loadCart() {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
    this.cartSub.next(this.cart); // Frissítjük a kosár Observable-jét
  }
}