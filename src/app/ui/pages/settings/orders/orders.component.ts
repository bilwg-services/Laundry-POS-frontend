import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  deliveryTime: number = 3;
  autoDelivery: boolean = false;
  pickupNotice: number = 0;
  enableExpressDelivery: boolean = false;
  expressDeliveryTime: number = 1;
  expressPriceList: string = 'express';

  toggleEdit(): void {
    // Handle edit mode toggling logic if required
  }

}
