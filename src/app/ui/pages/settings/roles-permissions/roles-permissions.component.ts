import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../../../../model/roles';

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

  currentViewRole: Roles = {
    name: '',
    type: '',
    permissions: [],
    status: '',
  }
  
  editMode: boolean = false;

  // Original dataset (to avoid overwriting during search/filter)
  originalDataSource = [
    {name: 'Owner', type: 'Default', permissions: ['All Permissions'], status: 'Active'},
    { name: 'Staff', type: 'Default', permissions: ['Order Management'], status: 'Active' },
    { name: 'Delivery', type: 'Default', permissions: ['Delivery Management', 'Order Management'], status: 'Active' },
    { name: 'Account Team', type: 'Custom', permissions: ['Delivery Management', 'Order Management', 'Analytics', 'Payment Management'], status: 'Active' },
    { name: 'Support Team', type: 'Custom', permissions: ['Customer Support', 'Order Updates'], status: 'Active' },
    { name: 'Marketing', type: 'Custom', permissions: ['Campaign Management', 'Analytics', 'Customer Engagement'], status: 'Inactive' },
    { name: 'IT Support', type: 'Default', permissions: ['System Maintenance', 'Access Control'], status: 'Active' },
    { name: 'HR Manager', type: 'Custom', permissions: ['Employee Management', 'Recruitment'], status: 'Active' },
    { name: 'Finance Team', type: 'Custom', permissions: ['Payment Management', 'Budgeting', 'Analytics'], status: 'Inactive' },
    { name: 'Quality Assurance', type: 'Custom', permissions: ['Product Testing', 'Delivery Management'], status: 'Active' },
    { name: 'Customer Service', type: 'Default', permissions: ['Customer Support', 'Feedback Management'], status: 'Active' },
    { name: 'Sales Team', type: 'Custom', permissions: ['Lead Management', 'Order Creation', 'Customer Engagement'], status: 'Active' },
    { name: 'Admin', type: 'Default', permissions: ['All Permissions'], status: 'Active' },
    { name: 'Logistics', type: 'Default', permissions: ['Order Tracking', 'Inventory Management'], status: 'Active' },
    { name: 'Operations', type: 'Custom', permissions: ['Workflow Management', 'Order Management', 'Analytics'], status: 'Inactive' },
    { name: 'Product Manager', type: 'Custom', permissions: ['Product Development', 'Analytics', 'Team Coordination'], status: 'Active' },
    { name: 'Legal Team', type: 'Custom', permissions: ['Contract Management', 'Compliance'], status: 'Active' },
    { name: 'Data Analyst', type: 'Custom', permissions: ['Data Analysis', 'Report Generation', 'Forecasting'], status: 'Active' },
    { name: 'Procurement Team', type: 'Default', permissions: ['Vendor Management', 'Inventory Sourcing'], status: 'Active' },
    { name: 'Training Team', type: 'Custom', permissions: ['Employee Training', 'Skill Development'], status: 'Active' },
    { name: 'Risk Management', type: 'Custom', permissions: ['Compliance', 'Risk Assessment'], status: 'Inactive' },
    { name: 'Content Writer', type: 'Custom', permissions: ['Content Creation', 'SEO Optimization'], status: 'Active' },
    { name: 'Social Media Manager', type: 'Custom', permissions: ['Social Media Management', 'Engagement Analytics'], status: 'Active' },
    { name: 'Warehouse Team', type: 'Default', permissions: ['Inventory Organization', 'Order Packing'], status: 'Active' },
    { name: 'Field Technician', type: 'Custom', permissions: ['On-site Repairs', 'Technical Support'], status: 'Active' },
    { name: 'Compliance Officer', type: 'Default', permissions: ['Policy Enforcement', 'Audit Preparation'], status: 'Inactive' },
    { name: 'Security Team', type: 'Custom', permissions: ['Surveillance', 'Access Control'], status: 'Active' },
    { name: 'Fleet Manager', type: 'Custom', permissions: ['Vehicle Maintenance', 'Route Optimization'], status: 'Active' },
    { name: 'Event Coordinator', type: 'Custom', permissions: ['Event Planning', 'Budget Management'], status: 'Inactive' },
    { name: 'Research Analyst', type: 'Custom', permissions: ['Market Research', 'Trend Analysis'], status: 'Active' },
    { name: 'Innovation Team', type: 'Custom', permissions: ['Idea Generation', 'Prototyping'], status: 'Active' }
  ];

  dataListLength: number = this.originalDataSource.length;
  

  dataSource = [...this.originalDataSource]; // Data source for display
  selectedFilter = 'all'; // Default filter (all roles)
  selectedSort: 'name' | 'type' | 'permissions' | 'status' = 'name'; // Default sort by name
  sortOrder: 'asc' | 'desc' = 'asc'; // Default sort order

  constructor(private router: Router) {}

  ngOnInit(): void {
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
    if (this.selectedFilter === 'all') {
      // Show all roles if no filter is selected
      this.dataSource = [...this.originalDataSource];
    } else {
      // Filter based on the selected role
      this.dataSource = this.originalDataSource.filter((staff) => staff.name === this.selectedFilter);
    }
  }

  applySort() {
    const sortKey = this.selectedSort as keyof typeof this.originalDataSource[0];

    this.dataSource.sort((a, b) => {
      const valueA = Array.isArray(a[sortKey]) ? a[sortKey].join(', ') : a[sortKey];
      const valueB = Array.isArray(b[sortKey]) ? b[sortKey].join(', ') : b[sortKey];

      if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  addStaff() {
    // Example logic to add a new staff (replace with your logic)
    const newStaff = {
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

      this.originalDataSource = this.originalDataSource.filter((item) => item !== role);
      this.dataSource = [...this.originalDataSource]; // Refresh the data source
      console.log('Deleted staff:', role);
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
    const startIndex = (this.currentPage-1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.originalDataSource.slice(startIndex, endIndex);
  }
}
