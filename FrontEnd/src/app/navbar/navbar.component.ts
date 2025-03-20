import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { TranslateService } from '@ngx-translate/core';  // Importáljuk a TranslateService-t

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  itemCount: number = 0; // Kosár darabszáma
  currentLanguage: string = 'hu'; // Alapértelmezett nyelv

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.authService.getIsLoggedUser().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      console.log("Jelenleg bejelentkezett: ", this.isLoggedIn);
    });

    this.cartService.getCart().subscribe(cart => {
      this.itemCount = this.cartService.getCartItemCount(); 
    });

    this.translate.setDefaultLang('hu');
    this.translate.use('hu');
  }


  switchLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'hu' ? 'en' : 'hu';
    this.translate.use(this.currentLanguage);
  }

  logout() {
    this.authService.signOut().then(() => {
      console.log("Felhasználó kijelentkezett");
    });
  }
}
