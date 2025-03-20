import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductListComponent implements OnInit {
  products: any = [];
  filteredProducts: any[] = [];
  newProduct:any = {  
  };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.products = res;
        this.filteredProducts = res;
      },
      (err:any) => {
        console.error('Hiba történt a termékek betöltésekor:', err);
      }
    );
  }

  editProduct(product: any) {
    // this.router.navigate(['/admin/edit-product', productId]);
    this.productService.updateProduct(product.id, product).subscribe()
  }

  addProduct() {
    // if (!this.newProduct.name || this.newProduct.price <= 0) {
    //   alert('Adj meg érvényes termékadatokat!');
    //   return;
    // }

    this.newProduct={
      
        "title": "Ervin",
        "artist": "string",
        "price": 0,
        "genre": "string",
        "imageUrl": "string"
      
    }
    
    

    this.productService.addProduct(this.newProduct).subscribe({
      next:() => {
        this.loadProducts(); 
        this.newProduct = { name: '', price: 0, description: '' }; 
      },
      error:(err) => {
        console.error('Hiba történt a termék hozzáadásakor:', err);
      }
    });
  }

  deleteProduct(product: any) {
    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        console.log('Termék sikeresen törölve');
        this.loadProducts();
      },
      error: (err) => {
        console.error('Hiba történt a termék törlésénél:', err);
      }
    });
  }
}

