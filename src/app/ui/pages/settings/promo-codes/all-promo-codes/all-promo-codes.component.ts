import { Component, OnInit } from '@angular/core';
import { PreloadingStrategy } from '@angular/router';


@Component({
  selector: 'app-all-promo-codes',
  templateUrl: './all-promo-codes.component.html',
  styleUrl: './all-promo-codes.component.scss'
})

export class AllPromoCodesComponent implements OnInit {

  promoCodes: any[] = []; // Replace with your promo codes data model
  viewMode: string = 'table'; // Default to table view
  filterActive: boolean = false;
  sortActive: boolean = false;
  searchActive: boolean = false;
  selectedPromoType: string = 'all'; // Default filter
  selectedSortType: string = 'promo_name'; // Default sort type
  searchQuery: string = '';

  displayedColumns: string[] = [
    'promoName',
    'type',
    'minOrderAmount',
    'maxDiscountAmount',
    'expireDate',
    'isPublic',
    'actions',
  ];

  itemsPerPage: number = 10;
  currentPage: number = 1;

  dataSource = this.promoCodes

  constructor() {}

  ngOnInit(): void {
    this.fetchPromoCodes();
  }

  // Mock function to fetch promo codes - replace with your API call
  fetchPromoCodes(): void {
    // Replace this mock data with an actual API call to fetch promo codes
    this.promoCodes = [
      {
        id: 1,
        promo_name: 'Summer Sale',
        type: 'percentage',
        min_order_amount: 500,
        max_discount_amount: 100,
        expire_date: new Date(2024, 6, 31), // July 31, 2024
        is_public: true,
      },
      {
        id: 2,
        promo_name: 'Winter Discount',
        type: 'flat',
        min_order_amount: 1000,
        max_discount_amount: 200,
        expire_date: new Date(2024, 11, 31), // December 31, 2024
        is_public: false,
      },
      {
        id: 3,
        promo_name: 'Festive Offer',
        type: 'percentage',
        min_order_amount: 800,
        max_discount_amount: 150,
        expire_date: new Date(2024, 9, 10), // October 10, 2024
        is_public: true,
      },
      {
        id: 4,
        promo_name: 'Flash Sale',
        type: 'flat',
        min_order_amount: 300,
        max_discount_amount: 50,
        expire_date: new Date(2024, 5, 15), // June 15, 2024
        is_public: true,
      },
      {
        id: 5,
        promo_name: 'New Year Special',
        type: 'percentage',
        min_order_amount: 1200,
        max_discount_amount: 250,
        expire_date: new Date(2025, 0, 1), // January 1, 2025
        is_public: false,
      },
      {
        id: 6,
        promo_name: 'Black Friday Deal',
        type: 'flat',
        min_order_amount: 2000,
        max_discount_amount: 500,
        expire_date: new Date(2024, 10, 29), // November 29, 2024
        is_public: true,
      },
      {
        id: 7,
        promo_name: 'Exclusive Membership Offer',
        type: 'percentage',
        min_order_amount: 1500,
        max_discount_amount: 300,
        expire_date: new Date(2024, 8, 15), // September 15, 2024
        is_public: false,
      },
      {
        id: 8,
        promo_name: 'Cyber Monday Discount',
        type: 'flat',
        min_order_amount: 1000,
        max_discount_amount: 200,
        expire_date: new Date(2024, 10, 25), // November 25, 2024
        is_public: true,
      },
      {
        id: 9,
        promo_name: 'Back to School',
        type: 'percentage',
        min_order_amount: 400,
        max_discount_amount: 80,
        expire_date: new Date(2024, 7, 30), // August 30, 2024
        is_public: true,
      },
      {
        id: 10,
        promo_name: 'Loyalty Reward',
        type: 'flat',
        min_order_amount: 600,
        max_discount_amount: 120,
        expire_date: new Date(2024, 6, 1), // July 1, 2024
        is_public: false,
      },
      {
        id: 11,
        promo_name: 'Eid Mubarak Special',
        type: 'percentage',
        min_order_amount: 700,
        max_discount_amount: 140,
        expire_date: new Date(2024, 3, 30), // April 30, 2024
        is_public: true,
      },
      {
        id: 12,
        promo_name: 'Christmas Cheer',
        type: 'flat',
        min_order_amount: 1000,
        max_discount_amount: 250,
        expire_date: new Date(2024, 11, 25), // December 25, 2024
        is_public: true,
      },
      {
        id: 13,
        promo_name: 'Anniversary Celebration',
        type: 'percentage',
        min_order_amount: 2000,
        max_discount_amount: 500,
        expire_date: new Date(2024, 4, 20), // May 20, 2024
        is_public: false,
      },
      {
        id: 14,
        promo_name: 'First-Time Buyer Offer',
        type: 'flat',
        min_order_amount: 300,
        max_discount_amount: 75,
        expire_date: new Date(2024, 2, 1), // March 1, 2024
        is_public: true,
      },
      {
        id: 15,
        promo_name: 'Weekend Madness',
        type: 'percentage',
        min_order_amount: 500,
        max_discount_amount: 90,
        expire_date: new Date(2024, 6, 8), // July 8, 2024
        is_public: true,
      },
    ];

    this.paginateData();
    

    // Apply search filter
    if (this.searchQuery) {
      this.promoCodes = this.promoCodes.filter((promo) =>
        promo.promo_name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Apply promo type filter
    if (this.selectedPromoType !== 'all') {
      this.promoCodes = this.promoCodes.filter(
        (promo) => promo.type === this.selectedPromoType
      );
    }

    // Apply sorting
    this.promoCodes = this.promoCodes.sort((a, b) =>
      a[this.selectedSortType] > b[this.selectedSortType] ? 1 : -1
    );
  }

  toggleFilter(): void {
    this.filterActive = !this.filterActive;
  }

  toggleSort(): void {
    this.sortActive = !this.sortActive;
  }

  toggleSearch(): void {
    this.searchActive = !this.searchActive;
    if (!this.searchActive) {
      this.searchQuery = ''; // Clear the search query
      this.fetchPromoCodes(); // Re-fetch promo codes without search filter
    }
  }

  onSearchInput(event: any): void {
    this.searchQuery = event.target.value;
    this.fetchPromoCodes(); // Re-fetch promo codes with search filter
  }

  addPromoCode(): void {
    // Logic for adding a new promo code
    console.log('Add Promo Code');
  }

  viewPromo(id: number): void {
    // Logic for viewing details of a promo code
    console.log('View Promo Code:', id);
  }

  editPromo(id: number): void {
    // Logic for editing a promo code
    console.log('Edit Promo Code:', id);
  }

  removePromo(id: number): void {
    // Logic for removing a promo code
    this.promoCodes = this.promoCodes.filter((promo) => promo.id !== id);
    console.log('Remove Promo Code:', id);
  }

  onPageChange(event: any): void {
    console.log("Page index is: ", event.pageIndex)
    console.log("Page Size is: ", event.pageSize)
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.paginateData();
  }

  paginateData(): void {
    const startIndex = (this.currentPage-1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.promoCodes.slice(startIndex, endIndex);
 
  }
}
