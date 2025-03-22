import { Component } from '@angular/core'; 
import { CartService } from '../cart.service';

@Component({
  selector: 'app-basket',
  standalone: false,
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  cart: any[] = [];
  itemCount: number = 0;
  paymentPopupVisible: boolean = false; 
  orderSuccessPopupVisible: boolean = false;
  paymentMethod: string = '';

  constructor(private cartService: CartService) {
    this.loadCart();
  }

  loadCart() {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
    this.updateItemCount();
  }

  updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateItemCount();
  }
  updateItemCount() {
    this.itemCount = this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  deleteProduct(productId: number) {
    const productIndex = this.cart.findIndex(item => item.id === productId);
  
    if (productIndex !== -1) {
      if (this.cart[productIndex].quantity > 1) {
        this.cart[productIndex].quantity--;
      } else {
        this.cart.splice(productIndex, 1);
      }
  
      this.updateLocalStorage();
    }
  }
  
  
  decreaseQuantity(productId: number) {
    const productIndex = this.cart.findIndex(item => item.id === productId);
    
    if (productIndex !== -1 && this.cart[productIndex].quantity > 1) {
      this.cart[productIndex].quantity--;
      this.updateLocalStorage(); 
    }
  }
  
  increaseQuantity(productId: number) {
    const productIndex = this.cart.findIndex(item => item.id === productId);
    
    if (productIndex !== -1) {
      this.cart[productIndex].quantity++;
      this.updateLocalStorage();
    }
  }
  
  openPaymentPopup() {
    this.paymentPopupVisible = true;
  }

  closePaymentPopup() {
    this.paymentPopupVisible = false;
  }

  confirmPayment() {
    if (this.paymentMethod) {
      this.paymentPopupVisible = false;
      this.orderSuccessPopupVisible = true;
      this.clearCart();
    } else {
      alert('Kérem válassza ki a fizetési módot!');
    }
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }

  closeSuccessPopup() {
    this.orderSuccessPopupVisible = false;
  }
}