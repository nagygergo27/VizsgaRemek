import { Component } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-products',
  standalone: false,
  
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  
  plates: any

  constructor(private config:ConfigService) {
    
  }
}
