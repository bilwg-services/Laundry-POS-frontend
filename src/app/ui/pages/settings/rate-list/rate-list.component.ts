import { Component } from '@angular/core';
import { RateListService } from '../../../../services/rate-list.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { LaundryServiceModel } from '../../../../model/laundry_service';




@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrl: './rate-list.component.scss'
})
export class RateListComponent {
  searchTerm: unknown;

  constructor(private rateListService: RateListService, private router: Router) {}

  
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

        this.filteredServices = this.services;
        this.categories = [...new Set(this.services.map(service => service.category).filter(category => category))];
        this.subCategories = [...new Set(this.services.map(service => service.sub_category).filter(sub_category => sub_category))];
        this.groups = [...new Set(this.services.map(service => service.group_name).filter(group_name => group_name))];
        this.priceLists = [...new Set(this.services.map(service => service.price_list_id).filter(price_list_id => price_list_id))];

      } else {
        console.error('Failed to fetch customers:', response.message);
      }
    });
  }

  services: LaundryServiceModel[] = [];
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
  }

  onSearchInput(event: any): void {
    this.searchSubject.next(event.target.value);
  }


  editService(service: LaundryServiceModel) {
    // Implement edit functionality here
    console.log('Edit service:', service);
  }

  addService(){
    this.router.navigate(['/settings/rate-list/add-service']);
  }
  addPriceList() {}
}
