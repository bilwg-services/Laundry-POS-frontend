import { Component } from '@angular/core';
import { CustomerService } from '../../../../services/customer.service';
import { Customer } from '../../../../model/customers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.scss'
})
export class NewCustomerComponent {
  viewMode: string = 'form';
  customerForm: FormGroup;
  selectedFile: File | null = null;
  isDragging: boolean = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private router: Router
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

  ngOnInit(): void { }

  async createCustomer(): Promise<void> {
    if (this.customerForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    try {
      const customerData: Customer = this.customerForm.value;
      const response = await this.customerService.createCustomer(customerData).toPromise();
      if (response.status === 200) {
        this.snackBar.open('Customer created successfully!', 'Close', {
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

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async uploadCsv(): Promise<void> {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        const response = await this.customerService.uploadCsv(formData).toPromise();
        if (response.status === 200) {
          this.snackBar.open('CSV uploaded successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/customers']);
        } else {
          this.showError(response);
        }
      } catch (error) {
        this.showError(error);
      }
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

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.onFileChange({ target: { files } });
    }
  }

}
