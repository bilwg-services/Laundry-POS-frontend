import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Staff } from '../../../../model/staff';
import { StaffService } from '../../../../services/staff.service';

@Component({
  selector: 'app-new-staff',
  templateUrl: './new-staff.component.html',
  styleUrl: './new-staff.component.scss'
})
export class NewStaffComponent {
  customerForm: FormGroup;
  selectedFile: File | null = null;
  isDragging: boolean = false;
  password: string = this.generateRandomPassword();
  loginDetails: { email: string, password: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  async createStaff(): Promise<void> {
    if (this.customerForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    try {
      const staffData = this.customerForm.value;
      const response = await this.staffService.createStaff(staffData, this.password).toPromise();
      if (response.status === 200) {
        this.snackBar.open('Staff created successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.loginDetails = { email: staffData.email.toLowerCase() ?? "", password: this.password };
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


  private generateRandomPassword(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  }


  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.snackBar.open('Copied to clipboard!', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-success']
      });
    });
  }


}
