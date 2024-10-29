import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../../../services/expense.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from '../../../../model/expense';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.scss']
})
export class UpdateExpenseComponent implements OnInit {
  viewMode: string = 'details';
  expenseForm: FormGroup;
  expenseId: number = 0;
  editMode: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.expenseForm = this.fb.group({
      expense_name: ['', Validators.required],
      expense_type: [''],
      description: [''],
      amount: ['', Validators.required],
      user_id: [null],
      status: [''],
      category: [''],
      expense_date: ['']
    });
  }

  ngOnInit(): void {
    this.expenseId = +this.route.snapshot.paramMap.get('id')!;
    this.loadExpenseData();
  }

  async loadExpenseData(): Promise<void> {
    try {
      const response = await this.expenseService.getExpenseById(this.expenseId).toPromise();
      if (response.status === 200) {
        this.expenseForm.patchValue(response.data);
      } else {
        this.showError(response);
      }
    } catch (error) {
      this.showError(error);
    }
  }

  async updateExpense(): Promise<void> {
    if (this.expenseForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    try {
      const expenseData: Expense = this.expenseForm.value;
      const response = await this.expenseService.updateExpense(this.expenseId, expenseData).toPromise();
      if (response.status === 200) {
        this.snackBar.open('Expense updated successfully!', 'Close', {
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
