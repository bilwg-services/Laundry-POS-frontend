import { Component, ViewChild } from '@angular/core';
import { Customer } from '../../../../model/customers';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomerService } from '../../../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrl: './all-customers.component.scss'
})
export class AllCustomersComponent {
  dataSource = new MatTableDataSource<Customer>();
  searchTerm: string = '';
  selectedDiscountType: string = 'all';
  viewMode: string = 'table';
  itemsPerPage: number = 10;
  currentPage: number = 1;

  matColumnDef:string[] = ['name', 'email', 'phone', 'address', 'loyaltyPoints', 'discountEligibility'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    const filters: any = {};
    if (this.selectedDiscountType !== 'all') {
      filters.discount_eligibility = this.selectedDiscountType;
    }

    this.customerService.getAllCustomers(this.currentPage, this.itemsPerPage, 'created_at', 'asc', this.searchTerm, filters).subscribe(response => {
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

}