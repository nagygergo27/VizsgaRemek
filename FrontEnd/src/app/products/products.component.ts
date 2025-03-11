import { Component } from '@angular/core';
import { ConfigService } from '../config.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']  
})
export class ProductsComponent {
  products: any[] = [];
  showModal: boolean = false;
  selectedProduct: any;

  constructor(private config: ConfigService, private cartService: CartService) {
    this.config.getProducts().subscribe(
      (res: any) => {
        this.products = res;
        console.log(this.products);
      }
    );
  }

  addCart(product: any) {
    this.cartService.addProduct(product); // Kosárba rakás
  }

  openPurchaseModal(product: any) {
    this.selectedProduct = product;
    this.showModal = true; // Megjeleníti a vásárlás megerősítő ablakot
  }

  closeModal() {
    this.showModal = false; // Bezárja a modális ablakot
  }

  confirmPurchase() {
    this.addCart(this.selectedProduct); // Kosárba rakja a kiválasztott terméket
    this.closeModal(); // Bezárja a modális ablakot
  }
}