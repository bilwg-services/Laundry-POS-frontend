import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../../services/expense.service';
import { Expense } from '../../../../model/expense';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})
export class NewExpenseComponent implements OnInit {
  expenseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.expenseForm = this.fb.group({
      expense_name: ['', Validators.required],
      expense_type: [''],
      amount: ['', Validators.required],
      description: [''],
      category: [''],
      status: ['', Validators.required]
      // expense_date: ['']
    });
  }

  ngOnInit(): void { }

  async createExpense(): Promise<void> {
    if (this.expenseForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    try {
      const organizationId = localStorage.getItem('organizationId');
      const userId = localStorage.getItem('userId');

      console.log('organizationId', organizationId);
      console.log('userId', userId);
      if (!organizationId || !userId) {
        this.snackBar.open('Organization ID is missing. Please log in again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        await this.router.navigate(['/login']);
        return;
      }

      const expenseData: Expense = {
        ...this.expenseForm.value,
        organization_id: Number(organizationId),
        user_id: Number(userId)
      };

      const response = await this.expenseService.createExpense(expenseData).toPromise();

      if (response?.status === 200) {
        this.snackBar.open('Expense created successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/expense']);
      } else {
        this.showError(response);
      }
    } catch (error) {
      this.showError(error);
    }
  }

  private showError(error: any): void {
    const errorMessage = error?.message || 'An error occurred';
    this.snackBar.open(errorMessage, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-error']
    });
  }
}
