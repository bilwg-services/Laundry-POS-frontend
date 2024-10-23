import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../../../model/customers';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.scss'
})
export class UpdateCustomerComponent {
  viewMode: string = 'profile';
  customerForm: FormGroup;
  customerId: number = 0;
  editMode:Boolean = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      address: ['', Validators.required],
      loyalty_points: [0, [Validators.required, Validators.min(0)]],
      discount_eligibility: [false],
      biographic_info: ['']
    });
  }

  ngOnInit(): void {
    this.customerId = +this.route.snapshot.paramMap.get('id')!;
    this.loadCustomerData();
  }

  async loadCustomerData(): Promise<void> {
    try {
      const response = await this.customerService.getCustomerById(this.customerId).toPromise();
      if (response.status === 200) {
        this.customerForm.patchValue(response.data);
      } else {
        this.showError(response);
      }
    } catch (error) {
      this.showError(error);
    }
  }

  async updateCustomer(): Promise<void> {
    if (this.customerForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    try {
      const customerData: Customer = this.customerForm.value;
      const response = await this.customerService.updateCustomer(this.customerId, customerData).toPromise();
      if (response.status === 200) {
        this.snackBar.open('Customer updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/customer']);
      } else {
        this.showError(response);
      }
    } catch (error) {
      this.showError(error);
    }
  }

  private showError(error: any): void {
    let errorMessage = 'An error occurred';
    if (error.message) {
      errorMessage = error.message;
    }
    if (error.error) {
      errorMessage += ': ' + JSON.stringify(error.error);
    }
    this.snackBar.open(errorMessage, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-error']
    });
  }
}
