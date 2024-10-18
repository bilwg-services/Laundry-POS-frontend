import { Component, ViewChild } from '@angular/core';
import { Customer } from '../../../../model/customers';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrl: './all-customers.component.scss'
})
export class AllCustomersComponent {

  data: Customer[] = [{
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Elm St, Springfield, IL",
    loyaltyPoints: 120,
    discountEligibility: true,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-10-01"),
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "234-567-8901",
    address: "456 Oak St, Springfield, IL",
    loyaltyPoints: 50,
    discountEligibility: false,
    createdAt: new Date("2023-02-20"),
    updatedAt: new Date("2023-10-05"),
  },
  {
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@example.com",
    phone: "345-678-9012",
    address: "789 Pine St, Springfield, IL",
    loyaltyPoints: 200,
    discountEligibility: true,
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-10-07"),
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    phone: "456-789-0123",
    address: "321 Maple St, Springfield, IL",
    loyaltyPoints: 80,
    discountEligibility: true,
    createdAt: new Date("2023-01-25"),
    updatedAt: new Date("2023-10-08"),
  },
  {
    firstName: "Sarah",
    lastName: "Davis",
    email: "sarah.davis@example.com",
    phone: "567-890-1234",
    address: "654 Cedar St, Springfield, IL",
    loyaltyPoints: 0,
    discountEligibility: false,
    createdAt: new Date("2023-04-15"),
    updatedAt: new Date("2023-10-09"),
  },
  {
    firstName: "David",
    lastName: "Martinez",
    email: "david.martinez@example.com",
    phone: "678-901-2345",
    address: "987 Spruce St, Springfield, IL",
    loyaltyPoints: 150,
    discountEligibility: true,
    createdAt: new Date("2023-05-20"),
    updatedAt: new Date("2023-10-10"),
  },
  {
    firstName: "Laura",
    lastName: "Garcia",
    email: "laura.garcia@example.com",
    phone: "789-012-3456",
    address: "258 Birch St, Springfield, IL",
    loyaltyPoints: 30,
    discountEligibility: false,
    createdAt: new Date("2023-06-11"),
    updatedAt: new Date("2023-10-11"),
  },
  {
    firstName: "Daniel",
    lastName: "Martinez",
    email: "daniel.martinez@example.com",
    phone: "890-123-4567",
    address: "369 Fir St, Springfield, IL",
    loyaltyPoints: 90,
    discountEligibility: true,
    createdAt: new Date("2023-07-30"),
    updatedAt: new Date("2023-10-12"),
  },
  {
    firstName: "Olivia",
    lastName: "Hernandez",
    email: "olivia.hernandez@example.com",
    phone: "901-234-5678",
    address: "147 Redwood St, Springfield, IL",
    loyaltyPoints: 110,
    discountEligibility: true,
    createdAt: new Date("2023-08-14"),
    updatedAt: new Date("2023-10-13"),
  },
  {
    firstName: "James",
    lastName: "Lopez",
    email: "james.lopez@example.com",
    phone: "012-345-6789",
    address: "258 Willow St, Springfield, IL",
    loyaltyPoints: 45,
    discountEligibility: false,
    createdAt: new Date("2023-09-01"),
    updatedAt: new Date("2023-10-14"),
  },
  {
    firstName: "Sophia",
    lastName: "Lee",
    email: "sophia.lee@example.com",
    phone: "123-456-7891",
    address: "369 Ash St, Springfield, IL",
    loyaltyPoints: 75,
    discountEligibility: true,
    createdAt: new Date("2023-01-18"),
    updatedAt: new Date("2023-10-15"),
  },
  {
    firstName: "Alexander",
    lastName: "Walker",
    email: "alexander.walker@example.com",
    phone: "234-567-8902",
    address: "147 Elm St, Springfield, IL",
    loyaltyPoints: 60,
    discountEligibility: true,
    createdAt: new Date("2023-02-22"),
    updatedAt: new Date("2023-10-16"),
  },
  {
    firstName: "Ava",
    lastName: "Hall",
    email: "ava.hall@example.com",
    phone: "345-678-9013",
    address: "258 Oak St, Springfield, IL",
    loyaltyPoints: 130,
    discountEligibility: true,
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-10-17"),
  },
  {
    firstName: "Mason",
    lastName: "Allen",
    email: "mason.allen@example.com",
    phone: "456-789-0124",
    address: "369 Pine St, Springfield, IL",
    loyaltyPoints: 10,
    discountEligibility: false,
    createdAt: new Date("2023-04-12"),
    updatedAt: new Date("2023-10-18"),
  },
  {
    firstName: "Isabella",
    lastName: "Young",
    email: "isabella.young@example.com",
    phone: "567-890-1235",
    address: "741 Cedar St, Springfield, IL",
    loyaltyPoints: 220,
    discountEligibility: true,
    createdAt: new Date("2023-05-25"),
    updatedAt: new Date("2023-10-19"),
  },
  {
    firstName: "Ethan",
    lastName: "King",
    email: "ethan.king@example.com",
    phone: "678-901-2346",
    address: "852 Birch St, Springfield, IL",
    loyaltyPoints: 15,
    discountEligibility: false,
    createdAt: new Date("2023-06-08"),
    updatedAt: new Date("2023-10-20"),
  },
  {
    firstName: "Mia",
    lastName: "Wright",
    email: "mia.wright@example.com",
    phone: "789-012-3457",
    address: "963 Fir St, Springfield, IL",
    loyaltyPoints: 95,
    discountEligibility: true,
    createdAt: new Date("2023-07-19"),
    updatedAt: new Date("2023-10-21"),
  },
  {
    firstName: "Lucas",
    lastName: "Scott",
    email: "lucas.scott@example.com",
    phone: "890-123-4568",
    address: "159 Redwood St, Springfield, IL",
    loyaltyPoints: 180,
    discountEligibility: true,
    createdAt: new Date("2023-08-30"),
    updatedAt: new Date("2023-10-22"),
  },
  {
    firstName: "Amelia",
    lastName: "Green",
    email: "amelia.green@example.com",
    phone: "901-234-5679",
    address: "753 Willow St, Springfield, IL",
    loyaltyPoints: 55,
    discountEligibility: false,
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2023-10-23"),
  }];

  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'loyaltyPoints', 'discountEligibility', 'createdAt', 'updatedAt'];
  dataSource = new MatTableDataSource<Customer>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  searchTerm = "";
  selectedStatus = "all";

  viewMode = 'table'; // or 'card'
  itemsPerPage = 10;
  currentPage = 0; // Initialize current page
  totalPages = 0; // Total pages based on data length
  
  // Your customer data and other variables...
  customers: Customer[] = this.data; // Load your customers here

  ngOnInit() {
    this.dataSource.data = this.customers; // Set your customer data
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.firstPage();
  }


  // Implement your pagination logic if necessary
  addCustomer() {
    // Logic to add customer
  }



  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex; // Update current page
    this.itemsPerPage = event.pageSize; // Update items per page
    this.dataSource.paginator = this.paginator; // Reassign paginator
  }

}