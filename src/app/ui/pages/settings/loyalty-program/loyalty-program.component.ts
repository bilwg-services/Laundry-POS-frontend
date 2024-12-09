import { Component } from '@angular/core';

@Component({
  selector: 'app-loyalty-program',
  templateUrl: './loyalty-program.component.html',
  styleUrl: './loyalty-program.component.scss'
})
export class LoyaltyProgramComponent {

  loyaltyProgram = {
    active: false,
    currencyToPoint: 0,
    pointToCurrency: 0,
    minPointsToRedeem: 0,
  };

  saveLoyaltySettings() {
    // Save settings to the server or local state
    console.log('Loyalty Program Settings:', this.loyaltyProgram);
  }

}
