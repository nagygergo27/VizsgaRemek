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
  product: any;
  paymentPopupVisible: boolean = false;  // Fizetési mód választó popup
  orderSuccessPopupVisible: boolean = false;  // Sikeres rendelés popup
  paymentMethod: string = '';  // Kiválasztott fizetési mód

  constructor(private cartServices: CartService) {
    this.cartServices.getCart().subscribe(
      (res) => this.cart = res
    );
  }

  // Termék törlése a kosárból
  deleteProduct(productId: any) {
    this.cartServices.deleteProduct(productId);
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
    } else {
      alert('Kérem válassza ki a fizetési módot!');
    }
  }

  // Sikeres rendelés popup bezárása
  closeSuccessPopup() {
    this.orderSuccessPopupVisible = false;
  }
}
