import { Component, OnInit } from '@angular/core';


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
        expire_date: new Date(),
        is_public: true,
      },
      {
        id: 2,
        promo_name: 'Winter Discount',
        type: 'flat',
        min_order_amount: 1000,
        max_discount_amount: 200,
        expire_date: new Date(),
        is_public: false,
      },
    ];

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
}
