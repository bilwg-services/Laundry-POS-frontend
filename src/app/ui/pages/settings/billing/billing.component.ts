import { Component } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent {

  billingDetails = {
    companyName: '',
    address: '',
    phone: '',
    email: '',
    gstin: ''
  };

  // Bank Account Details
  bankDetails = {
    accountHolderName: '',
    accountNumber: '',
    ifsc: '',
    upi: ''
  };

  // Submit Handler
  onSubmit() {
    // You can handle form submission here
    console.log('Billing Details:', this.billingDetails);
    console.log('Bank Account Details:', this.bankDetails);

    // Additional logic: Validation, API call, etc.
    if (this.isValid()) {
      // Simulate saving data
      alert('Billing information submitted successfully!');
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  // Validation Function
  isValid(): boolean {
    // Example validation: Ensure required fields are not empty
    return (
      this.billingDetails.companyName.trim() !== '' &&
      this.billingDetails.address.trim() !== '' &&
      this.billingDetails.phone.trim() !== '' &&
      this.billingDetails.email.trim() !== '' &&
      this.bankDetails.accountHolderName.trim() !== '' &&
      this.bankDetails.accountNumber.trim() !== '' &&
      this.bankDetails.ifsc.trim() !== ''
    );
  }

}
