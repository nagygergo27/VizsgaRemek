import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service'; // Az AuthService importálása

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'https://localhost:7025/api/Orders';  // API végpont

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Adminok számára az összes rendelés lekérése
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Felhasználók számára a saját rendelésük lekérése
  getOrdersForUser(): Observable<any[]> {
    return this.authService.getLoggedUser().pipe(
      switchMap((user: any) => {
        if (user && user.uid) {
          // A felhasználó ID-ját használjuk a rendelés lekéréséhez
          return this.getOrdersByUserId(user.uid);
        } else {
          throw new Error('Felhasználói token nem található!');
        }
      })
    );
  }

  // Rendelések lekérése a felhasználó ID-ja alapján
  getOrdersByUserId(userId: string): Observable<any[]> {
    console.log('Felhasználó ID:', userId); 
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Rendelés törlése
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Új rendelés leadása
  placeOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderData);
  }
}

