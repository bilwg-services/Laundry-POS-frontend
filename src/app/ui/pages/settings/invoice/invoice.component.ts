import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {

  invoicePrefix: string = 'INV-';
  invoiceNumber: number = 0;
  currentInvoiceId: number = 4284;
  generateInvoiceStatus: string = 'Paid';
  noInvoiceZeroTax: boolean = false;
  noInvoiceZeroTotal: boolean = false;

  toggleEdit(): void {
    // Logic for toggling settings if needed
  }

}
