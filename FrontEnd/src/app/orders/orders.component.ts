import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  deleteOrder(id: number): void {
    if (confirm('Biztos törölni szeretnéd ezt a rendelést?')) {
      this.ordersService.deleteOrder(id).subscribe(() => {
        this.orders = this.orders.filter(order => order.id !== id);
      });
    }
  }
}
