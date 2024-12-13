import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolesModel } from '../../../../model/roles';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../widget/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-roles-permissions',
  templateUrl: './roles-permissions.component.html',
  styleUrls: ['./roles-permissions.component.scss'], // Note: Corrected to 'styleUrls'
})
export class RolesPermissionsComponent implements OnInit {
  viewMode: string = 'table';
  viewR: boolean = false;
  roleEditMode: boolean = false;
  showAddRole: boolean = false;
  searchActive: boolean = false;
  filterActive: boolean = false;
  sortActive: boolean = false;

  itemsPerPage: number = 10;
  currentPage: number = 1;

  currentViewRole: RolesModel = {
    id: 0,
    name: '',
    type: '',
    permissions: [],
    status: '',
  }

  editMode: boolean = false;

  filterByRole: string[] = [];

  // Original dataset (to avoid overwriting during search/filter)
  originalDataSource: RolesModel[] = [
    { id: 1, name: 'Owner', type: 'Default', permissions: ['All Permissions'], status: 'Active' },
    { id: 2, name: 'Staff', type: 'Default', permissions: ['Order Management'], status: 'Active' },
    { id: 3, name: 'Owner', type: 'Default', permissions: ['Delivery Management', 'Order Management'], status: 'Active' },
    { id: 4, name: 'Account Team', type: 'Custom', permissions: ['Delivery Management', 'Order Management', 'Analytics', 'Payment Management'], status: 'Active' },
    { id: 5, name: 'Owner', type: 'Custom', permissions: ['Customer Support', 'Order Updates'], status: 'Active' },
    { id: 6, name: 'Marketing', type: 'Custom', permissions: ['Campaign Management', 'Analytics', 'Customer Engagement'], status: 'Inactive' },
    { id: 7, name: 'IT Support', type: 'Default', permissions: ['System Maintenance', 'Access Control'], status: 'Active' },
    { id: 8, name: 'HR Manager', type: 'Custom', permissions: ['Employee Management', 'Recruitment'], status: 'Active' },
    { id: 9, name: 'Finance Team', type: 'Custom', permissions: ['Payment Management', 'Budgeting', 'Analytics'], status: 'Inactive' },
    { id: 10, name: 'Staff', type: 'Custom', permissions: ['Product Testing', 'Delivery Management'], status: 'Active' },
    { id: 11, name: 'Owner', type: 'Default', permissions: ['Customer Support', 'Feedback Management'], status: 'Active' },
    { id: 12, name: 'Sales Team', type: 'Custom', permissions: ['Lead Management', 'Order Creation', 'Customer Engagement'], status: 'Active' },
    { id: 13, name: 'Admin', type: 'Default', permissions: ['All Permissions'], status: 'Active' },
    { id: 14, name: 'Logistics', type: 'Default', permissions: ['Order Tracking', 'Inventory Management'], status: 'Active' },
    { id: 15, name: 'Operations', type: 'Custom', permissions: ['Workflow Management', 'Order Management', 'Analytics'], status: 'Inactive' },
    { id: 16, name: 'Staff', type: 'Custom', permissions: ['Product Development', 'Analytics', 'Team Coordination'], status: 'Active' },
    { id: 17, name: 'Legal Team', type: 'Custom', permissions: ['Contract Management', 'Compliance'], status: 'Active' },
    { id: 18, name: 'Staff', type: 'Custom', permissions: ['Data Analysis', 'Report Generation', 'Forecasting'], status: 'Active' },
    { id: 19, name: 'Admin', type: 'Default', permissions: ['Vendor Management', 'Inventory Sourcing'], status: 'Active' },
    { id: 20, name: 'Training Team', type: 'Custom', permissions: ['Employee Training', 'Skill Development'], status: 'Active' },
    { id: 21, name: 'Staff', type: 'Custom', permissions: ['Compliance', 'Risk Assessment'], status: 'Inactive' },
    { id: 22, name: 'Staff', type: 'Custom', permissions: ['Content Creation', 'SEO Optimization'], status: 'Active' },
    { id: 23, name: 'Admin', type: 'Custom', permissions: ['Social Media Management', 'Engagement Analytics'], status: 'Active' },
    { id: 24, name: 'Owner', type: 'Default', permissions: ['Inventory Organization', 'Order Packing'], status: 'Active' },
    { id: 25, name: 'Staff', type: 'Custom', permissions: ['On-site Repairs', 'Technical Support'], status: 'Active' },
    { id: 26, name: 'Admin', type: 'Default', permissions: ['Policy Enforcement', 'Audit Preparation'], status: 'Inactive' },
    { id: 27, name: 'Staff', type: 'Custom', permissions: ['Surveillance', 'Access Control'], status: 'Active' },
    { id: 28, name: 'Staff', type: 'Custom', permissions: ['Vehicle Maintenance', 'Route Optimization'], status: 'Active' },
    { id: 29, name: 'Staff', type: 'Custom', permissions: ['Event Planning', 'Budget Management'], status: 'Inactive' },
    { id: 30, name: 'Owner', type: 'Custom', permissions: ['Market Research', 'Trend Analysis'], status: 'Active' },
    { id: 31, name: 'Staff', type: 'Custom', permissions: ['Idea Generation', 'Prototyping'], status: 'Active' }
  ];

  dataListLength: number = this.originalDataSource.length;


  dataSource = [...this.originalDataSource]; // Data source for display
  selectedFilter = 'All Roles'; // Default filter (all roles)
  sortOrder: 'asc' | 'desc' = 'asc'; // Default sort order

  selectSortKeys: string[] = ['Name', 'Status', 'Permissions', 'Type'];
  selectedSortKey: string = 'Name';

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    const roleNames = new Set(this.originalDataSource.map(role => role.name));

    this.filterByRole = Array.from(roleNames);
    this.filterByRole.unshift("All Roles")

    console.log("Filtered roles are: ", this.filterByRole);
    this.paginateData();
  }



  toggleSearch() {
    this.searchActive = !this.searchActive;

    // Reset the data source when toggling search off
    if (!this.searchActive) {
      this.dataSource = [...this.originalDataSource];
    }
  }

  toggleFilter() {
    this.filterActive = !this.filterActive;
  }

  toggleSort() {
    this.sortActive = !this.sortActive;
  }

  onSearchInput(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.dataSource = this.originalDataSource.filter((staff) =>
      staff.name.toLowerCase().includes(searchValue)
    );
  }

  applyFilter() {
    if (this.selectedFilter === 'All Roles') {
      // Show all roles if no filter is selected
      this.dataSource = [...this.originalDataSource];
    } else {
      // Filter based on the selected role
      this.dataSource = this.originalDataSource.filter((staff) => staff.name === this.selectedFilter);
    }
  }

  applySort() {
    console.log("Inside applySort");

    const sortKey = this.selectedSortKey as keyof RolesModel; // Ensure the key is valid for the object

    // Sort the dataSource array based on the selected key
    this.dataSource.sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      // Compare values, handling string and non-string cases
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // Fallback for non-string comparisons
      return this.sortOrder === 'asc' ? (valueA < valueB ? -1 : 1) : (valueA > valueB ? -1 : 1);
    });

    console.log("Sorted dataSource:", this.dataSource);
  }


  addStaff() {
    // Example logic to add a new staff (replace with your logic)
    const newStaff = {
      id: this.originalDataSource[this.originalDataSource.length - 1]['id'] + 1,
      name: 'New Role',
      type: 'Custom',
      permissions: ['Custom Permission'],
      status: 'Active',
    };
    this.originalDataSource.push(newStaff);
    this.dataSource = [...this.originalDataSource]; // Refresh the data source
  }

  updateStaff(staff: any) {
    console.log('Editing staff:', staff);
    // Add your edit logic here
  }

  viewRole(role: any) {
    this.viewR = true;
    this.currentViewRole = role
    console.log(this.currentViewRole)
  }

  deleteRole(role: any) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "confirm") {
        this.originalDataSource = this.originalDataSource.filter((item) => item !== role);
        this.dataSource = [...this.originalDataSource]; // Refresh the data source
        console.log('Deleted staff:', role);
      }
    })

    

  }

  toggleEdit() {
    this.editMode = !this.editMode
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.paginateData();
  }

  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.originalDataSource.slice(startIndex, endIndex);
  }
}
