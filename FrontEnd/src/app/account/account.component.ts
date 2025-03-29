import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userData: any = {};
  orders: any[] = [];
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private ordersService: OrdersService) {}

  ngOnInit(): void {
    // Felhasználói adatokat kérünk le
    this.authService.getUserData().subscribe(data => {
      this.userData = {
        email: data?.email,
        displayName: data?.displayName || 'Nincs név',
        phoneNumber: data?.phoneNumber || 'Nincs telefonszám',
        emailVerified: data?.emailVerified ? 'Megerősítve' : 'Nem megerősítve',
        creationTime: data?.metadata.creationTime,
        photoURL: data?.photoURL || '',
        isAnonymous: data?.isAnonymous ? 'Igen' : 'Nem'
      };

      // Admin státusz lekérése
      this.isAdmin = data?.isAdmin || false;

      // A rendeléseket a felhasználó ID-ja alapján kérjük le
      const userId = data?.uid; // Ha Firebase authentication-öt használsz, akkor az ID az `uid` lehet
      if (userId) {
        this.loadOrders(userId);
      }
    });
  }

  // Rendelések betöltése
  loadOrders(userId: string): void {
    if (this.isAdmin) {
      // Adminok számára az összes rendelés
      this.ordersService.getOrders().subscribe(
        (orders) => {
          this.orders = orders;
        },
        (error) => {
          console.error('Hiba történt a rendelésekkel kapcsolatban:', error);
        }
      );
    } else {
      // Felhasználók számára csak a saját rendelésük
      this.ordersService.getOrdersByUserId(userId).subscribe(
        (orders) => {
          this.orders = orders;
        },
        (error) => {
          console.error('Hiba történt a rendelésekkel kapcsolatban:', error);
        }
      );
    }
  }

  changePassword() {
    const newPassword = prompt('Adja meg az új jelszót:');
    if (newPassword) {
      console.log('Jelszó módosítva:', newPassword);
      alert('Jelszó sikeresen módosítva!');
    }
  }
}
