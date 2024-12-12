import { Component } from '@angular/core';
import { RateListService } from '../../../../services/rate-list.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { LaundryServiceModel } from '../../../../model/laundry_service';
import { SharedDataService } from '../../../../services/shared';
import { UpdateServiceModel } from '../../../../model/updateService';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrl: './rate-list.component.scss'
})
export class RateListComponent {
  searchTerm: unknown;

  constructor(private rateListService: RateListService, private snackBar: MatSnackBar, private router: Router, private sharedDataService: SharedDataService) { }

  itemsPerPage: number = 10;
  currentPage: number = 1;
  dataShared: boolean = false;

  editMode:boolean = false;
  
  showAddServiceDialog:boolean = false;
  rateListForAddService:string = 'Default';
  toggleAddService() {
    this.showAddServiceDialog = true;
  }

  ngOnInit(): void {
    this.fetchServices();
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.filterServices();
    });
  }


  fetchServices(): void {

    this.rateListService.getAllServices(
      1, 2000).subscribe(response => {
        if (response.status === 200) {
          this.services = response.data;
          this.filterServices();
          this.categories = [...new Set(this.services.map(service => service.category).filter(category => category))];
          this.subCategories = [...new Set(this.services.map(service => service.sub_category).filter(sub_category => sub_category))];
          this.groups = [...new Set(this.services.map(service => service.group_name).filter(group_name => group_name))];
          this.priceLists = [...new Set(this.services.map(service => service.price_list_id).filter(price_list_id => price_list_id))];
          console.log("PriceLists: ", this.priceLists)

        } else {
          console.error('Failed to fetch customers:', response.message);
        }
      });
  }

  services: LaundryServiceModel[] = [];
  dataSource: LaundryServiceModel[] = [];
  filteredServices: LaundryServiceModel[] = [];
  categories: string[] = [];
  subCategories: string[] = [];
  groups: string[] = [];
  priceLists: string[] = [];
  selectedCategory = '';
  selectedSubCategory = '';
  selectedGroup = '';
  selectedPriceListId = 'Default';
  searchSubject: Subject<string> = new Subject<string>();


  filterServices() {
    this.filteredServices = this.services.filter(service => {
      return (
        (this.selectedCategory ? service.category === this.selectedCategory : true) &&
        (this.selectedSubCategory ? service.sub_category === this.selectedSubCategory : true) &&
        (this.selectedGroup ? service.group_name === this.selectedGroup : true) &&
        (this.selectedPriceListId ? service.price_list_id === this.selectedPriceListId : true) &&
        (this.searchTerm ? service.name.toLowerCase().includes((this.searchTerm as string).toLowerCase()) : true)
      );
    });

    if(this.selectedPriceListId === 'Default' && this.dataShared === false) {
      let newRateList = this.filteredServices.map((service) => {
        service = {
          ...service,
          custom_price: service.price
        }
        return service
      })
      this.sharedDataService.setServices(newRateList);
      this.dataShared = true;
    }


    this.paginateData()
  }

  onSearchInput(event: any): void {
    this.searchSubject.next(event.target.value);
  }

  editableService: UpdateServiceModel = {
    id: 0,
    name: '',
    price: 0,
    price_type: '',
    icon: '',
    CGST: 0,
    SGST: 0,
    tax_enabled: false,
    hsn: '',
    group_name: '',
    sub_category: '',
    category: '',
    price_list_id: '',
  }

  editService(service: LaundryServiceModel) {
    this.editableService = {
      id: service.id,
      icon: '',
      tax_enabled: service.tax_enabled,
      hsn: service.hsn,
      name: service.name,
      price: service.price,
      price_type: service.price_type,
      CGST: service.cgst,
      SGST: service.sgst,
      category: service.category,
      sub_category: service.sub_category,
      group_name: service.group_name,
      price_list_id: this.selectedPriceListId,
    }
    this.editMode = true;
  }


  addService() {
    this.router.navigate(['/settings/rate-list/add-service', this.rateListForAddService]);
  }

  updateService() {
    this.rateListService.updateService(this.editableService).subscribe((response) => {

      if(response.status === 200) {
        this.snackBar.open('Service updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        console.log("Service updated successfully")
        this.editMode = false
        this.router.navigate(['/settings/rate-list']);
      } else {
        console.log("Rate list cannot be updated")
      }

    })
  }

  addRateList() {
    this.services = this.services.map((service) => {
      return {
        custom_price: service.price,
        ...service,
      }
    })
    this.router.navigate(['/settings/rate-list/add-rate-list'])
  }
  addPriceList() { }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.paginateData();
  }

  paginateData(): void {
    const startIndex = (this.currentPage-1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.dataSource = this.filteredServices.slice(startIndex, endIndex);
  }
}
