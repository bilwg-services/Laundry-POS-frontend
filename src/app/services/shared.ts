import { Injectable } from '@angular/core';
import { LaundryServiceModel } from '../model/laundry_service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private services: LaundryServiceModel[] = [];

  setServices(services: LaundryServiceModel[]): void {
    this.services = services;
  }

  getServices(): LaundryServiceModel[] {
    return this.services;
  }
}
