import { Component, Inject, Input } from '@angular/core';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-new-order-single',
  templateUrl: './new-order-single.component.html',
  styleUrl: './new-order-single.component.scss'
})
export class NewOrderSingleComponent {
  email: string = '';

  constructor(private orderService: OrderService, 
    @Inject('tabId') public tabId: string
  ) {}

  ngOnInit(): void {
    if (this.tabId) {
      const state = this.orderService.getTabState(this.tabId);
      if (state) {
        this.email = state.email;
      }
    }
  }

  saveState(): void {
    this.orderService.setTabState(this.tabId, { email: this.email });
  }
}
