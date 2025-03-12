import { Component, OnInit } from '@angular/core';
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
  filteredProducts: any[] = [];
  showModal: boolean = false;
  selectedProduct: any;
  searchQuery: string = '';

  constructor(private config: ConfigService, private cartService: CartService) {
    this.config.getProducts().subscribe(
      (res: any) => {
        this.products = res;
        this.filteredProducts = res;
        console.log(this.products);
      }
    );
  }

  searchProducts() {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.artist.toLowerCase().includes(query) ||
      product.genre.toLowerCase().includes(query)
    );
  }

  addCart(product: any) {
    this.cartService.addProduct(product); 
  }

  openPurchaseModal(product: any) {
    this.selectedProduct = product;
    this.showModal = true; 
  }

  closeModal() {
    this.showModal = false; 
  }

  confirmPurchase() {
    this.addCart(this.selectedProduct);
    this.closeModal();
  }
}
