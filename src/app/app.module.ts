import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './ui/pages/auth/login/login.component';
import { DashboardComponent } from './ui/pages/dashboard/dashboard.component';
import { LandingComponent } from './ui/pages/landing/landing.component';
import { AllCustomersComponent } from './ui/pages/customers/all-customers/all-customers.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { SelectOrganizationComponent } from './ui/pages/auth/select-organization/select-organization.component';
import { NewCustomerComponent } from './ui/pages/customers/new-customer/new-customer.component';
import { UpdateCustomerComponent } from './ui/pages/customers/update-customer/update-customer.component';
import { CustomPaginatorComponent } from './ui/widget/custom-paginator/custom-paginator.component';
import { AllStaffsComponent } from './ui/pages/staff/all-staffs/all-staffs.component';
import { NewStaffComponent } from './ui/pages/staff/new-staff/new-staff.component';
import { UpdateStaffComponent } from './ui/pages/staff/update-staff/update-staff.component';
import { NewOrderComponent } from './ui/pages/order/new-order/new-order.component';
import { NewOrderSingleComponent } from './ui/pages/order/new-order-single/new-order-single.component';
import { BusinessProfileComponent } from './ui/pages/settings/business-profile/business-profile.component';
import { RateListComponent } from './ui/pages/settings/rate-list/rate-list.component';
import { SettingsLandingComponent } from './ui/pages/settings/settings-landing/settings-landing.component';
import { ProfileComponent } from './ui/pages/settings/profile/profile.component';
import { AddServiceComponent } from './ui/pages/settings/add-service/add-service.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LandingComponent,
    AllCustomersComponent,
    SelectOrganizationComponent,
    NewCustomerComponent,
    UpdateCustomerComponent,
    CustomPaginatorComponent,
    AllStaffsComponent,
    NewStaffComponent,
    UpdateStaffComponent,
    NewOrderComponent,
    NewOrderSingleComponent,
    SettingsLandingComponent,
    ProfileComponent,
    BusinessProfileComponent,
    RateListComponent,
    AddServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
