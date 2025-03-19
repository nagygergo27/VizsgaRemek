import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TranslateService } from '@ngx-translate/core';  // Importáld a TranslateService-t

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  currentLanguage: string = 'hu'; // Alapértelmezett nyelv

  constructor(private authService: AuthService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.authService.getIsLoggedUser().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      console.log("Jelenleg bejelentkezett: ", this.isLoggedIn);
    });

    // Inicializáljuk a TranslateService-t, alapértelmezett nyelv beállítása
    this.translate.setDefaultLang('hu');
    this.translate.use('hu');
  }

  // Nyelv váltás funkció
  switchLanguage(): void {
    if (this.currentLanguage === 'hu') {
      this.translate.use('en');
      this.currentLanguage = 'en';
    } else {
      this.translate.use('hu');
      this.currentLanguage = 'hu';
    }
  }

  logout() {
    this.authService.signOut().then(() => {
      console.log("Felhasználó kijelentkezett");
    });
  }
}
