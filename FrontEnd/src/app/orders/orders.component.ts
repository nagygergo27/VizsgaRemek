import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  loggedUser: any;
  users: any;

  constructor(private auth: AuthService, private ordersService: OrdersService) {
    this.auth.getLoggedUser().subscribe(
      (loggedUser) => {
        this.loggedUser = loggedUser;
        console.log("Users logged23:::", this.loggedUser);
        if (this.loggedUser) {
          console.log("Lekérjük a usereket!!!!");
          this.auth.getUsers()?.subscribe(
            (users) => this.users = users
          );
        }
      }
    );
  }

  searchUser(uid: any) {
    if (this.users)
      return (this.users.filter((e: any) => e.uid == uid)[0].displayName);
    else return "";
  }

  ngOnInit(): void {
    this.loadOrders();
    this.loadStatuses();
  }

  loadOrders(): void {
    this.ordersService.getOrders().subscribe(data => {
      this.orders = data;
      this.loadStatuses();
    });
  }

  deleteOrder(id: number): void {
    if (confirm('Biztos törölni szeretnéd ezt a rendelést?')) {
      this.ordersService.deleteOrder(id).subscribe(() => {
        this.orders = this.orders.filter(order => order.id !== id);
        this.loadStatuses();
      });
    }
  }

  loadStatuses() {
    const savedStatuses = localStorage.getItem('orderStatuses');
    if (savedStatuses) {
      const statusMap = JSON.parse(savedStatuses);
      this.orders.forEach(order => {
        if (statusMap[order.id]) {
          order.status = statusMap[order.id];
        }
      });
    }
  }

  updateOrderStatus(order: any) {
    const statusMap = JSON.parse(localStorage.getItem('orderStatuses') || '{}');
    statusMap[order.id] = order.status;
    localStorage.setItem('orderStatuses', JSON.stringify(statusMap));
  }
}
