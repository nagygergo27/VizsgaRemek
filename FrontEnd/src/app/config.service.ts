import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl = 'https://localhost:7199/api/Products';
  
  

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  
}