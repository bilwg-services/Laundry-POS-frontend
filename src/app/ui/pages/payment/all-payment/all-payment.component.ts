import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ExpenseService } from '../../../../services/expense.service';

@Component({
  selector: 'app-all-payment',
  templateUrl: './all-payment.component.html',
  styleUrl: './all-payment.component.scss'
})
export class AllPaymentComponent {
  dataSource = new MatTableDataSource<any>();
  searchTerm: string = '';

  selectedStatus: string = 'all';
  selectedType: string = 'all';
  selectedCategory: string = 'all';


  selectedSortType: string = 'created_at';
  selectedSortMethed: string = 'asc';
  viewMode: string = 'table';
  itemsPerPage: number = 10;
  currentPage: number = 1;
  filterActive: boolean = false;
  sortActive: boolean = false;
  searchActive: boolean = false;
  searchSubject: Subject<string> = new Subject<string>();
  typeList: string[] = [];
  categoryList: string[] = [];


  matColumnDef:string[] = ['name','description', 'amount', 'expense_date', 'type', 'category', 'status', 'actions'];

  sortList: {label: string, value: string}[] = [
    {label: 'Name', value: 'expense_name'},
    {label: 'Status', value: 'status'},
    {label: 'Amount', value: 'amount'},
    {label: 'Expense Date', value: 'expense_date'},
    {label: 'Created At', value: 'created_at'},
    {label: 'Updated At', value: 'updated_at'},
    {label: 'Type', value: 'expense_type'},
    {label: 'Category', value: 'category'},
  ];


  constructor(private expenseService: ExpenseService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.fetchData();
    });
  }

  fetchData(isSortFilter = false): void {
    const filters: any = {};
    if (this.selectedStatus !== 'all') {
      filters.status = this.selectedStatus;
    }

    if (this.selectedCategory !== 'all') {
      filters.category = this.selectedCategory;
    }

    if (this.selectedType !== 'all') {
      filters.expense_type = this.selectedType;
    }

    this.expenseService.getAllExpense(this.currentPage, this.itemsPerPage, this.selectedSortType, this.selectedSortMethed, this.searchTerm, filters).subscribe(response => {
      if (response.status === 200) {
        this.dataSource.data = response.data;

        if(!isSortFilter){
          this.typeList = [...new Set((response.data as any[]).map((row: any) => row.expense_type as string).filter((type: string) => type))];
          this.categoryList = [...new Set((response.data as any[]).map((service: any) => service.category as string).filter((category: string) => category))];
        }
  
      } else {
        console.error('Failed to fetch:', response.message);
      }
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.fetchData();
  }

  addExpense(): void {
    this.router.navigate(['/expense-tracking/new']);
  }

  viewExpense(expenseId: number): void {
    this.router.navigate(['/expense-tracking', expenseId]);
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