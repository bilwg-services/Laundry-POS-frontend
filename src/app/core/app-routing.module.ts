import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../ui/pages/auth/login/login.component';
import { DashboardComponent } from '../ui/pages/dashboard/dashboard.component';
import { LandingComponent } from '../ui/pages/landing/landing.component';
import { AllCustomersComponent } from '../ui/pages/customers/all-customers/all-customers.component';
import {AuthGuard} from '../guard/auth.guard';
import {LoginGuard} from '../guard/login.guard';
import { SelectOrganizationComponent } from '../ui/pages/auth/select-organization/select-organization.component';
import { NewCustomerComponent } from '../ui/pages/customers/new-customer/new-customer.component';
import { UpdateCustomerComponent } from '../ui/pages/customers/update-customer/update-customer.component';
import { AllStaffsComponent } from '../ui/pages/staff/all-staffs/all-staffs.component';
import { NewStaffComponent } from '../ui/pages/staff/new-staff/new-staff.component';
import { UpdateStaffComponent } from '../ui/pages/staff/update-staff/update-staff.component';
import { NewOrderComponent } from '../ui/pages/order/new-order/new-order.component';

import { B } from '@angular/cdk/keycodes';
import { BusinessProfileComponent } from '../ui/pages/settings/business-profile/business-profile.component';
import { RateListComponent } from '../ui/pages/settings/rate-list/rate-list.component';
import { SettingsLandingComponent } from '../ui/pages/settings/settings-landing/settings-landing.component';
import { ProfileComponent } from '../ui/pages/settings/profile/profile.component';
import { AddServiceComponent } from '../ui/pages/settings/add-service/add-service.component';
import { AllExpenseComponent } from '../ui/pages/expense/all-expense/all-expense.component';
import { NewExpenseComponent } from '../ui/pages/expense/new-expense/new-expense.component';
import { AllPaymentComponent } from '../ui/pages/payment/all-payment/all-payment.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard] // Prevent logged-in users from accessing login
  },
  {
    path: 'select-role',
    component: SelectOrganizationComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard] // Protect with AuthGuard
      },
      {
        path: 'customer',
        component: AllCustomersComponent,
        canActivate: [AuthGuard], // Protect with AuthGuard
      },
      {
        path: 'customer/new',
        component: NewCustomerComponent,
        canActivate: [AuthGuard], // Protect with AuthGuard
      },
      {
        path: 'customer/:id',
        component: UpdateCustomerComponent,
        canActivate: [AuthGuard], // Protect with AuthGuard
      },
      {
        path: 'payments-management',
        component: AllPaymentComponent,
        canActivate: [AuthGuard], // Protect with AuthGuard
      },

      {
        path: 'expense-tracking',
        component: AllExpenseComponent,
        canActivate: [AuthGuard], // Protect with AuthGuard
      },
      {
        path: 'expense-tracking/new',
        component: NewExpenseComponent,
        canActivate: [AuthGuard], // Protect with AuthGuard
      },

      {
        path: 'staff-management',
        component: AllStaffsComponent,
        canActivate: [AuthGuard], // Protect with AuthGuard
      },
      {
        path: 'staff-management/new',
        component: NewStaffComponent,
        canActivate: [AuthGuard], // Protect with AuthGuard
      },
      {
        path: 'staff-management/:id',
        component: UpdateStaffComponent,
        canActivate: [AuthGuard], // Protect with AuthGuard
      },
      {
        path: 'order',
        component: AllStaffsComponent,
        canActivate: [AuthGuard], // Protect with AuthGuard
      },
      {
        path: 'order/new',
        component: NewOrderComponent,
        canActivate: [AuthGuard], // Protect with AuthGuard
      },

      {
        path: 'settings',
        component: SettingsLandingComponent,
        canActivate: [AuthGuard], // Protect with AuthGuard
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full'
          },
          {
            path: 'profile',
            component: ProfileComponent,
            canActivate: [AuthGuard], // Protect with AuthGuard
          },
          {
            path: 'business-profile',
            component: BusinessProfileComponent,
            canActivate: [AuthGuard], // Protect with AuthGuard
          },      
           {
            path: 'rate-list',
            component: RateListComponent,
            canActivate: [AuthGuard], // Protect with AuthGuard
          },
          {
            path: 'rate-list/add-service',
            component: AddServiceComponent,
            canActivate: [AuthGuard], // Protect with AuthGuard
          },
          
        ]
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
