import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartSub = new BehaviorSubject<any[]>([]);
  private apiUrl = 'https://localhost:7025/api/Orders';

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  getCart() {
    return this.cartSub.asObservable();
  }

  addProduct(product: any) {
    const existingProductIndex = this.cart.findIndex(p => p.id === product.id);

    if (existingProductIndex !== -1) {
      this.cart[existingProductIndex].quantity++;
    } else {
      product.quantity = 1;
      this.cart.push(product);
    }

    this.updateCart();
  }

  deleteProduct(product: any) {
    const productIndex = this.cart.findIndex(p => p.id === product.id);
    if (productIndex !== -1) {
      if (this.cart[productIndex].quantity > 1) {
        this.cart[productIndex].quantity--; 
      } else {
        this.cart.splice(productIndex, 1);
      }
    }

    this.updateCart();
  }

  clearCart() {
    this.cart = [];
    this.updateCart(); 
  }

  getCartItemCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  private updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart)); 
    this.cartSub.next(this.cart); 
  }

  private loadCart() {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
    this.cartSub.next(this.cart);
  }

  placeOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderData);
  }
}
