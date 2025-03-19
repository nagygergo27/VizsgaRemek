import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
<<<<<<< HEAD
import { CartService } from '../cart.service';
import { TranslateService } from '@ngx-translate/core';  // Importáljuk a TranslateService-t
=======
import { TranslateService } from '@ngx-translate/core';  // Importáld a TranslateService-t
>>>>>>> 42c30a90670ff6910015ac4bc274b59fb5aa7c96

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
<<<<<<< HEAD
  itemCount: number = 0; // Kosár darabszáma
  currentLanguage: string = 'hu'; // Alapértelmezett nyelv

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private translate: TranslateService
  ) {}
=======
  currentLanguage: string = 'hu'; // Alapértelmezett nyelv

  constructor(private authService: AuthService, private translate: TranslateService) {}
>>>>>>> 42c30a90670ff6910015ac4bc274b59fb5aa7c96

  ngOnInit(): void {
    this.authService.getIsLoggedUser().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      console.log("Jelenleg bejelentkezett: ", this.isLoggedIn);
    });

<<<<<<< HEAD
    this.cartService.getCart().subscribe(cart => {
      this.itemCount = this.cartService.getCartItemCount(); 
    });

=======
    // Inicializáljuk a TranslateService-t, alapértelmezett nyelv beállítása
>>>>>>> 42c30a90670ff6910015ac4bc274b59fb5aa7c96
    this.translate.setDefaultLang('hu');
    this.translate.use('hu');
  }

<<<<<<< HEAD

  switchLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'hu' ? 'en' : 'hu';
    this.translate.use(this.currentLanguage);
=======
  // Nyelv váltás funkció
  switchLanguage(): void {
    if (this.currentLanguage === 'hu') {
      this.translate.use('en');
      this.currentLanguage = 'en';
    } else {
      this.translate.use('hu');
      this.currentLanguage = 'hu';
    }
>>>>>>> 42c30a90670ff6910015ac4bc274b59fb5aa7c96
  }

  logout() {
    this.authService.signOut().then(() => {
      console.log("Felhasználó kijelentkezett");
    });
  }
}
