import { Component } from '@angular/core';
import { RateListService } from '../../../../services/rate-list.service';
import { Router } from '@angular/router';
import { LaundryServiceModel } from '../../../../model/laundry_service';
import { SharedDataService } from '../../../../services/shared';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-rate-list',
  templateUrl: './add-rate-list.component.html',
  styleUrls: ['./add-rate-list.component.scss'],
})
export class AddRateListComponent {

  services: LaundryServiceModel[] = [];

  constructor(private rateListService: RateListService, private router: Router, private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.services = this.sharedDataService.getServices();
    console.log("Services inside add rate list components: ", this.services)
    if(this.services.length === 0) {
      this.router.navigate(['/settings/rate-list'])
    }
  }
  

  name: string = '';
  percentage: number = 0;
  options: string[] = ['Mark up Price', 'Mark down Price', 'Add Manual Price'];
  viewMode: 'form' | 'manualPrice' = 'form';
  selectedOption: string = ''

  showNameError: boolean = false;
  showPercentageError: boolean = false;

  productList = [
    { name: 'Apron', defaultPrice: 35, customPrice: 25 },
    { name: 'Bath Mat thick', defaultPrice: 14, customPrice: 14 },
    { name: 'Bath Robe', defaultPrice: 121, customPrice: 121 },
    // Add more items as needed
  ];

  helperSaveRateList(newRateList: LaundryServiceModel[]) {
    this.rateListService.createRateList(newRateList).subscribe(response => {
      if(response.status === 200) {
        console.log("Rate list added successfully.");
        this.router.navigate(['/settings/rate-list'])
      } else {
        console.error('Failed to fetch rateList:', response.message);
      }

    })
  }

  saveRateList(): void {
    if(this.viewMode === 'manualPrice') {
      const newRateList: LaundryServiceModel[] = this.services.map((service) => {
        service = {
          ...service,
          price: service.custom_price ?? service.price,
          price_list_id: this.name,
        }
        delete service.custom_price;
        return service;
      });
      this.helperSaveRateList(newRateList);
    } 
    else {

      if(this.percentage <= 0 || this.percentage > 100) {
        this.showPercentageError = true;
        return;
      } 
      this.showPercentageError = false;

      if(this.selectedOption === this.options[0]) {
        const newRateList: LaundryServiceModel[] = this.services.map((service) => {
          let newPrice = Math.floor(service.price + ((service.price) * this.percentage / 100))
          service = {
            ...service,
            price: newPrice,
            price_list_id: this.name,
          }
          delete service.custom_price;
          console.log("Price is: ", service.price)
          return service;
        });
        this.helperSaveRateList(newRateList);

      } else {
        const newRateList:LaundryServiceModel[] = this.services.map((service) => {

          let newPrice = Math.floor(service.price - ((service.price) * this.percentage / 100))
          service = {
            ...service,
            price: newPrice,
            price_list_id: this.name,
          }
          delete service.custom_price;
          return service;
        });
        this.helperSaveRateList(newRateList);
      }  
    }
    
  }

  goNext() {
    if(this.name.trim() === '') {
      this.showNameError = true
      console.log("Name required")
    } else {
      this.showNameError = false
    }

    if(this.showNameError === false) this.selectedOption === this.options[2] ? this.viewMode = 'manualPrice' : this.saveRateList()
  }

  deleteData(id: number) {
    this.services = this.services.filter((service) => service.id !== id)
  }
}
