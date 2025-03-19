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
  paymentPopupVisible: boolean = false;  // Fizetési mód választó popup
  orderSuccessPopupVisible: boolean = false;  // Sikeres rendelés popup
  paymentMethod: string = '';  // Kiválasztott fizetési mód

  constructor(private cartService: CartService) {
    this.loadCart(); // Kosár betöltése a localStorage-ból
  }

  // Kosár betöltése a localStorage-ból
  loadCart() {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
  }

  // Kosár frissítése a localStorage-ban
  updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // Termék törlése a kosárból
  deleteProduct(productId: number) {
    const productIndex = this.cart.findIndex(item => item.id === productId); // Az adott termék keresése a kosárban
  
    if (productIndex !== -1) {
      // Ha több darab van, akkor csak az egyik példányt töröljük
      if (this.cart[productIndex].quantity > 1) {
        this.cart[productIndex].quantity--; // Csökkentjük a mennyiséget
      } else {
        this.cart.splice(productIndex, 1); // Ha már csak 1 darab van, eltávolítjuk
      }
  
      this.updateLocalStorage(); // Frissítjük a kosár állapotát a localStorage-ban
    }
  }
  
  
  
  

  // Fizetési mód választó popup megnyitása
  openPaymentPopup() {
    this.paymentPopupVisible = true;
  }

  // Fizetési mód választó popup bezárása
  closePaymentPopup() {
    this.paymentPopupVisible = false;
  }

  // Rendelés megerősítése
  confirmPayment() {
    if (this.paymentMethod) {
      this.paymentPopupVisible = false;  // Fizetési popup bezárása
      this.orderSuccessPopupVisible = true;  // Sikeres rendelés popup megjelenítése
      this.clearCart(); // Kosár kiürítése sikeres rendelés után
    } else {
      alert('Kérem válassza ki a fizetési módot!');
    }
  }

  // Kosár kiürítése
  clearCart() {
    this.cart = []; // Kosár állapotának frissítése
    localStorage.removeItem('cart'); // Kosár törlése a localStorage-ból
  }

  // Sikeres rendelés popup bezárása
  closeSuccessPopup() {
    this.orderSuccessPopupVisible = false;
  }
}