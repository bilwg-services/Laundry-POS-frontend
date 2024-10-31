import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RateListService } from '../../../../services/rate-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from '../../../../model/customers';
import { Router } from '@angular/router';
import { LaundryServiceModel } from '../../../../model/laundry_service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss'
})
export class AddServiceComponent {
  serviceForm: FormGroup;
  viewMode: 'form' | 'csv' = 'form';
  private updating = false;

  constructor(private fb: FormBuilder, private rateListServive: RateListService, private snackBar: MatSnackBar, private router: Router) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      price_type: ['item', Validators.required],
      category: [''],
      sub_category: [''],
      group_name: [''],
      hsn: [''],
      cgst: [0, Validators.required],
      sgst: [0, Validators.required],
      tax_enabled: [false],
      gstAmount: [0],
      total: [0],
      price_list_id: ['Default'],
    });
    // this.setupValueChanges();
  }

  ngOnInit(): void {}

  async createService() {
    if (this.serviceForm.invalid) {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    try {
      const customerData: LaundryServiceModel = {
        ...this.serviceForm.value,
        cgst: parseFloat(this.serviceForm.get('cgst')?.value || 0),
        sgst: parseFloat(this.serviceForm.get('sgst')?.value || 0),
        gstAmount: parseFloat(this.serviceForm.get('gstAmount')?.value || 0),
        total: parseFloat(this.serviceForm.get('total')?.value || 0),
        price: parseFloat(this.serviceForm.get('price')?.value || 0)
      };
      const response = await this.rateListServive.createService(customerData).toPromise();
      if (response.status === 200) {
        this.snackBar.open('Service created successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/settings/rate-list']);
      } else {
        this.showError(response);
      }
    } catch (error) {
      this.showError(error);
    }
  }

  private showError(error: any): void {
    let errorMessage = 'An error occurred';
    if (error.message) {
      errorMessage = error.message;
    }
    if (error.error) {
      errorMessage += ': ' + JSON.stringify(error.error);
    }
    this.snackBar.open(errorMessage, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-error']
    });
  }



  onPriceInput() {
    this.updateGSTAndTotalFromPrice();
}

onTaxRateInput() {
    this.updateGSTAndTotalFromTaxRates();
}

onGstAmountInput() {
    this.updateTotalAndPriceFromGSTAmount();
}

onTotalInput() {
    this.updatePriceAndTaxFromTotal();
}

updateGSTAndTotalFromPrice() {
    if (this.updating) return;
    this.updating = true;

    const price = parseFloat(this.serviceForm.get('price')?.value || 0);
    const cgst = parseFloat(this.serviceForm.get('cgst')?.value || 0);
    const sgst = parseFloat(this.serviceForm.get('sgst')?.value || 0);

    const gstAmount = (price * (cgst + sgst)) / 100;
    const total = price + gstAmount;

    this.serviceForm.patchValue({
        gstAmount: gstAmount.toFixed(2),
        total: total.toFixed(2),
    }, { emitEvent: false });

    this.updating = false;
}

updateGSTAndTotalFromTaxRates() {
    if (this.updating) return;
    this.updating = true;

    const price = parseFloat(this.serviceForm.get('price')?.value || 0);
    const cgst = parseFloat(this.serviceForm.get('cgst')?.value || 0);
    const sgst = parseFloat(this.serviceForm.get('sgst')?.value || 0);

    const gstAmount = (price * (cgst + sgst)) / 100;
    const total = price + gstAmount;

    this.serviceForm.patchValue({
        gstAmount: gstAmount.toFixed(2),
        total: total.toFixed(2),
    }, { emitEvent: false });

    this.updating = false;
}

updateTotalAndPriceFromGSTAmount() {
    if (this.updating) return;
    this.updating = true;

    const gstAmount = parseFloat(this.serviceForm.get('gstAmount')?.value || 0);
    const cgst = parseFloat(this.serviceForm.get('cgst')?.value || 0);
    const sgst = parseFloat(this.serviceForm.get('sgst')?.value || 0);

    const price = (gstAmount * 100) / (cgst + sgst);
    const total = price + gstAmount;

    this.serviceForm.patchValue({
        price: price.toFixed(2),
        total: total.toFixed(2),
    }, { emitEvent: false });

    this.updating = false;
}

updatePriceAndTaxFromTotal() {
    if (this.updating) return;
    this.updating = true;

    const total = parseFloat(this.serviceForm.get('total')?.value || 0);
    const cgst = parseFloat(this.serviceForm.get('cgst')?.value || 0);
    const sgst = parseFloat(this.serviceForm.get('sgst')?.value || 0);

    const price = total / (1 + (cgst + sgst) / 100);
    const gstAmount = total - price;

    this.serviceForm.patchValue({
        price: price.toFixed(2),
        gstAmount: gstAmount.toFixed(2),
    }, { emitEvent: false });

    this.updating = false;
}

updatePriceAndTaxRatesFromGSTAndTotal() {
    if (this.updating) return;
    this.updating = true;

    const gstAmount = parseFloat(this.serviceForm.get('gstAmount')?.value || 0);
    const total = parseFloat(this.serviceForm.get('total')?.value || 0);

    const price = total - gstAmount;
    const taxRate = (gstAmount / price) * 100 / 2;  // Divided by 2 for both CGST and SGST

    this.serviceForm.patchValue({
        price: price.toFixed(2),
        cgst: taxRate.toFixed(2),
        sgst: taxRate.toFixed(2),
    }, { emitEvent: false });

    this.updating = false;
}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      console.log('File selected:', file);
      // Implement file handling logic here
    }
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files && event.dataTransfer.files.length) {
      const file = event.dataTransfer.files[0];
      console.log('File dropped:', file);
      // Implement file handling logic here
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  uploadCsv() {
    console.log('CSV upload initiated');
    // Implement CSV upload logic here
  }
}
