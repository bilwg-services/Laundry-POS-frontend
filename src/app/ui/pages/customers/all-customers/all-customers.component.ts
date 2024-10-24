import { Component, ViewChild } from '@angular/core';
import { Customer } from '../../../../model/customers';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomerService } from '../../../../services/customer.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrl: './all-customers.component.scss'
})
export class AllCustomersComponent {
  dataSource = new MatTableDataSource<any>();
  searchTerm: string = '';
  selectedDiscountType: string = 'all';
  selectedSortType: string = 'created_at';
  selectedSortMethed: string = 'asc';
  viewMode: string = 'table';
  itemsPerPage: number = 10;
  currentPage: number = 1;
  filterActive: boolean = false;
  sortActive: boolean = false;
  searchActive: boolean = false;
  searchSubject: Subject<string> = new Subject<string>();

  matColumnDef:string[] = ['name', 'email', 'phone', 'address', 'loyaltyPoints', 'discountEligibility', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCustomers();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.fetchCustomers();
    });
  }

  fetchCustomers(): void {
    const filters: any = {};
    if (this.selectedDiscountType !== 'all') {
      filters.discount_eligibility = this.selectedDiscountType;
    }

    this.customerService.getAllCustomers(this.currentPage, this.itemsPerPage, this.selectedSortType, this.selectedSortMethed, this.searchTerm, filters).subscribe(response => {
      if (response.status === 200) {
        this.dataSource.data = response.data;
        this.paginator.length = response.total; // Assuming the API response includes the total number of items
      } else {
        console.error('Failed to fetch customers:', response.message);
      }
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.fetchCustomers();
  }

  addCustomer(): void {
    this.router.navigate(['/customer/new']);
  }

  viewCustomer(customerId: number): void {
    this.router.navigate(['/customer', customerId]);
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