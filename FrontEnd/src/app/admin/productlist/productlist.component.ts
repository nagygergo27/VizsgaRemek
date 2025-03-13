import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../config.service';  
import { CartService } from '../../cart.service';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private configService: ConfigService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.configService.getProducts().subscribe(
      (res: any) => {
        this.products = res;
        this.filteredProducts = res;
      },
      (err) => {
        console.error('Hiba történt a termékek betöltésekor:', err);
      }
    );
  }

  editProduct(productId: number) {
    // Szerkesztés funkció, átirányít a szerkesztés oldalra
    this.router.navigate(['/admin/edit-product', productId]);
  }
    }