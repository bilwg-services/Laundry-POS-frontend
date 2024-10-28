import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CustomerService } from '../../../../services/customer.service';
import { Router } from '@angular/router';
import { StaffService } from '../../../../services/staff.service';
import { Staff } from '../../../../model/staff';

@Component({
  selector: 'app-all-staffs',
  templateUrl: './all-staffs.component.html',
  styleUrl: './all-staffs.component.scss'
})
export class AllStaffsComponent {
  dataList : Staff[] = [];
  dataSource = new MatTableDataSource<Staff>();
  searchTerm: string = '';

  selectedSortType: string = 'created_at';
  selectedSortMethed: string = 'asc';
  viewMode: string = 'table';
  itemsPerPage: number = 10;
  currentPage: number = 1;
  filterActive: boolean = false;
  sortActive: boolean = false;
  searchActive: boolean = false;
  searchSubject: Subject<string> = new Subject<string>();

  selectedStatus: string = 'all';
  selectedRole: string = 'all';
  selectedRoleStatus: string = 'all';

  matColumnDef: string[] = ['name', 'email', 'phone', 'role', 'status', 'actions'];


  constructor(private staffService: StaffService, private router: Router) { }

  ngOnInit(): void {
    this.fetchStaff();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.applyFiltersSortSearch();
    });
  }

  fetchStaff(): void {
    const filters: any = {};
    this.staffService.getAllStaff().subscribe(response => {
      if (response.status === 200) {
        this.dataSource.data = response.data;
        this.dataList = response.data;
        this.paginateData();  

        console.log('Users fetched successfully:', response.data);
      } else {
        console.error('Failed to fetch customers:', response.message);
      }
    });
  }

  applyFiltersSortSearch(): void {
    let filteredData = this.dataList;

    // Apply search filter
    if (this.searchTerm) {
      filteredData = filteredData.filter(staff =>
        staff?.user?.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        staff?.user?.last_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        staff?.user?.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        staff?.user?.phone_number.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (this.selectedStatus !== 'all') {
      filteredData = filteredData.filter(staff => staff?.user?.status === this.selectedStatus);
    }

    // Apply role filter
    if (this.selectedRole !== 'all') {
      filteredData = filteredData.filter(staff => staff.role === this.selectedRole);
    }

       // Apply role status filter
    if (this.selectedRoleStatus !== 'all') {
        filteredData = filteredData.filter(staff => staff.status === this.selectedRoleStatus);
      }

    // Apply sorting
    filteredData = filteredData.sort((a, b) => {
      const isAsc = this.selectedSortMethed === 'asc';
      switch (this.selectedSortType) {
        case 'first_name':
          return this.compare(a?.user?.first_name ?? '', b?.user?.first_name ?? '', isAsc);
          case 'last_name':
            return this.compare(a?.user?.last_name ?? '', b?.user?.last_name ?? '', isAsc);
        case 'email':
          return this.compare(a?.user?.email ?? '', b?.user?.email ?? '', isAsc);
        case 'phone':
          return this.compare(a?.user?.phone_number ?? '', b?.user?.phone_number ?? '',isAsc);
        case 'role':
          return this.compare(a.role, b.role, isAsc);
        case 'status':
          return this.compare(a?.user?.status ?? '', b?.user?.status ?? '', isAsc);
        case 'role-status':
          return this.compare(a.status, b.status, isAsc);
        case 'updated_at':
              return this.compare(a.updated_at, b.updated_at, isAsc);
        case 'created_at':
        default:
          return this.compare(a.created_at, b.created_at, isAsc);
      }
    });

    this.dataSource.data = filteredData;
    this.paginateData();  
  }

  compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onPageChange(event: any): void {

    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.paginateData();
  }


  paginateData(): void {
    const startIndex = (this.currentPage-1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource.data = this.dataList.slice(startIndex, endIndex);
 
  }

  addStaff(): void {
    this.router.navigate(['/staff-management/new']);
  }

  viewStaff(rel_id: number): void {
    this.router.navigate(['/staff-management', rel_id]);
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
