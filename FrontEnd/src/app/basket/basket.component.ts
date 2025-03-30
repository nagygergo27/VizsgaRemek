import { Component } from '@angular/core'; 
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';

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
  paymentDetailsPopupVisible: boolean = false;
  orderSuccessPopupVisible: boolean = false;
  paymentMethod: string = '';
  deliveryMethod: string = '';
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCVC: string = '';
  shippingAddress: string = '';
  user: any;

  constructor(private cartService: CartService, private auth: AuthService) {
    this.loadCart();
    this.auth.getLoggedUser().subscribe(
      (user) => this.user = user
    );
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
  
  openPaymentPopup() {
    this.paymentPopupVisible = true;
  }

  closePaymentPopup() {
    this.paymentPopupVisible = false;
  }

  proceedToPayment() {
    if (this.deliveryMethod) {
      this.paymentPopupVisible = false;
      this.paymentDetailsPopupVisible = true;
    } else {
      alert('Kérem válassza ki a szállítási módot!');
    }
  }

  closePaymentDetailsPopup() {
    this.paymentDetailsPopupVisible = false;
  }

  confirmPayment() {
    if (this.cardNumber && this.cardExpiry && this.cardCVC && (this.deliveryMethod !== 'home' || this.shippingAddress)) {
      this.paymentDetailsPopupVisible = false;
      this.orderSuccessPopupVisible = true;
    } else {
      alert('Kérjük, töltsön ki minden mezőt megfelelően!');
    }
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }

  closeSuccessPopup() {
    this.orderSuccessPopupVisible = false;

    if (!this.user || !this.user.uid) {
      console.error('Hiba: nincs bejelentkezett felhasználó!');
      return;
    }

    const orderData = {
      uId: this.user.uid,     
      date: new Date().toISOString(),
      items: this.cart.map(item => ({
        productId: item.id,
        // quantity: item.quantity > 0 ? item.quantity : 1, 
        piece: item.piece > 0 ? item.piece : 1,
        price: item.price,
      })),
      paymentMethod: this.paymentMethod || "card",
      deliveryMethod: this.deliveryMethod || "store",
      shippingAddress: this.shippingAddress || ""
    };

    console.log("Elküldött rendelési adatok:", orderData);

    this.cartService.placeOrder(orderData).subscribe({
      next: (response: any) => {
        console.log('Rendelés sikeresen mentve:', response);
        this.orderSuccessPopupVisible = false;
        this.clearCart();
      },
      error: (error: any) => {
        console.error('Hiba történt a rendelés mentésekor:', error);
      }
    });
  }
}