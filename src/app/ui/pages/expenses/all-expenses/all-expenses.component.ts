import { Component, ViewChild } from '@angular/core';
import { Expense } from '../../../../model/expense';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ExpenseService } from '../../../../services/expense.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.scss']
})
export class AllExpensesComponent {
  dataSource = new MatTableDataSource<Expense>();
  searchTerm: string = '';
  selectedCategory: string = 'all';
  selectedSortType: string = 'created_at';
  selectedSortMethod: string = 'asc';
  viewMode: string = 'table';
  itemsPerPage: number = 10;
  currentPage: number = 1;
  filterActive: boolean = false;
  sortActive: boolean = false;
  searchActive: boolean = false;
  searchSubject: Subject<string> = new Subject<string>();

  matColumnDef: string[] = ['expense_name', 'description', 'amount', 'status', 'category', 'expense_date', 'actions'];

  constructor(private expenseService: ExpenseService, private router: Router) {}

  ngOnInit(): void {
    let res = this.fetchExpenses();
    console.log('this.fetchExpenses()', res);

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.fetchExpenses();
    });
  }

  fetchExpenses(): void {
    const filters: any = {};
    if (this.selectedCategory !== 'all') {
      filters.category = this.selectedCategory;
    }

    this.expenseService.getAllExpenses(this.currentPage, this.itemsPerPage, this.selectedSortType, this.selectedSortMethod, this.searchTerm, filters).subscribe(response => {
      if (response.status === 200) {
        this.dataSource.data = response.data;
      } else {
        console.error('Failed to fetch expenses:', response.message);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.fetchExpenses();
  }

  addExpense(): void {
    this.router.navigate(['/expense/new']);
  }

  viewExpense(expenseId: number): void {
    this.router.navigate(['/expense', expenseId]);
  }

  toggleFilter(): void {
    this.filterActive = !this.filterActive;
  }

  toggleSort(): void {
    this.sortActive = !this.sortActive;
  }

  toggleSearch(): void {
    this.searchActive = !this.searchActive;
  }

  onSearchInput(event: any): void {
    this.searchSubject.next(event.target.value);
  }
}
