import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Expense } from '../../../../model/expense';
import { ExpenseService } from '../../../../services/expense.service';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrl: './new-expense.component.scss'
})
export class NewExpenseComponent {
  viewMode: string = 'form';
  expenseForm: FormGroup;
  selectedFile: File | null = null;
  isDragging: boolean = false;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.expenseForm = this.fb.group({
      expense_name: ['', Validators.required],
      description: [''],
      amount: [0, Validators.required],
      expense_type: ['fixed', Validators.required],
      category: [''],
      status: ['pending', Validators.required],
      expense_date: ['', Validators.required],
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
      const customerData: Expense = this.expenseForm.value;
      const response = await this.expenseService.createExpense(customerData).toPromise();
      if (response.status === 200) {
        this.snackBar.open('Expense created successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/expense-tracking']);
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
        const response = await this.expenseService.uploadCsv(formData).toPromise();
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
