import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../../../../model/customers';
import { CustomerService } from '../../../../services/customer.service';
import { Staff } from '../../../../model/staff';
import { StaffService } from '../../../../services/staff.service';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrl: './update-staff.component.scss'
})
export class UpdateStaffComponent {
  staffForm: FormGroup;
  rel_id: number = 0;
  staffId: number = 0;
  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.staffForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      role: ['', Validators.required],
      status: ['active'],
      roleStatus: ['active']
    });
  }

  ngOnInit(): void {
    this.rel_id = +this.route.snapshot.paramMap.get('id')!;
    this.loadStaffData();
  }

  async loadStaffData(): Promise<void> {
    try {
      const response = await this.staffService.getStaffById(this.rel_id).toPromise();
      console.log('Staff data:', response); 
      if (response.status === 200) {
        this.staffForm.patchValue({
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          email: response.data.user.email,
          phone_number: response.data.user.phone_number,
          role: response.data.role,
          status: response.data.user.status,
          roleStatus: response.data.status
        });
        this.staffId = response.data.user_id;
      
      } else {
        this.showError(response);
      }
    } catch (error) {
      this.showError(error);
    }
  }

  async updateStaff(): Promise<void> {
    if (this.staffForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    try {
      const staffData = this.staffForm.value;
      console.log('staffData:', staffData);
      const response = await this.staffService.updateStaff(this.rel_id, this.staffId, staffData).toPromise();
      if (response.status === 200) {
        this.snackBar.open('Staff updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/staff-management']);
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
