import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false; 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getIsLoggedUser().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout() {
    this.authService.signOut().then(() => {
      console.log("Felhasználó kijelentkezett");
    });
  }
}

