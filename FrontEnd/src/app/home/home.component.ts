import { Component, OnInit } from '@angular/core';
import { ProductService } from '../config.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });

    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
      searchIcon.addEventListener('click', () => {
        const searchBar = document.querySelector('.search-bar') as HTMLElement;
        searchBar.classList.toggle('active');
      });
    }
    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
      menuIcon.addEventListener('click', () => {
        const dropdownMenu = document.querySelector('.dropdown-menu') as HTMLElement;
        dropdownMenu.classList.toggle('show');
      });
    }
  }
}




