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
    console.log("Services in add rate list: ", this.services)
    
    if(this.services.length === 0) {
      this.router.navigate(['/settings/rate-list'])
    }
  }
  

  name: string = '';
  percentage: number = 0;
  options: string[] = ['Mark up Price', 'Mark down Price', 'Add Manual Price'];
  viewMode: 'form' | 'manualPrice' = 'form';
  selectedOption: string = ''

  productList = [
    { name: 'Apron', defaultPrice: 35, customPrice: 25 },
    { name: 'Bath Mat thick', defaultPrice: 14, customPrice: 14 },
    { name: 'Bath Robe', defaultPrice: 121, customPrice: 121 },
    // Add more items as needed
  ];

  saveRateList(): void {
    this.rateListService.createRateList(this.services).subscribe(response => {
      if(response.status === 200) {
        console.log("Rate list added successfully.")
      } else {
        console.error('Failed to fetch rateList:', response.message);
      }
    })
    console.log("Save rate list")
  }

  deleteData(id: number) {
    this.services = this.services.filter((service) => service.id !== id)
  }
}
