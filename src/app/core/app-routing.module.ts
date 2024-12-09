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
import { AddRateListComponent } from '../ui/pages/settings/add-rate-list/add-rate-list.component';
import { OrdersComponent } from '../ui/pages/settings/orders/orders.component';
import { InvoiceComponent } from '../ui/pages/settings/invoice/invoice.component';
import { BillingComponent } from '../ui/pages/settings/billing/billing.component';
import { StoreFrontComponent } from '../ui/pages/settings/store-front/store-front.component';
import { LoyaltyProgramComponent } from '../ui/pages/settings/loyalty-program/loyalty-program.component';
import { AllPromoCodesComponent } from '../ui/pages/settings/promo-codes/all-promo-codes/all-promo-codes.component';
import { AddOnsIntegrationsComponent } from '../ui/pages/settings/add-ons-integrations/add-ons-integrations.component';
import { RolesPermissionsComponent } from '../ui/pages/settings/roles-permissions/roles-permissions.component';
import { ConfigPageComponent } from '../ui/pages/settings/config-page/config-page.component';
import { ViewRoleComponent } from '../ui/pages/settings/view-role/view-role.component';

import {UpdateExpenseComponent} from '../ui/pages/expenses/update-expense/update-expense.component';


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
        path: 'expense/:id',
        component: UpdateExpenseComponent,
        canActivate: [AuthGuard], // Protect with AuthGuard
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
          {
            path: 'rate-list/add-rate-list',
            component: AddRateListComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'orders',
            component: OrdersComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'invoice',
            component: InvoiceComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'billing',
            component: BillingComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'promo-codes',
            component: AllPromoCodesComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'store-front',
            component: StoreFrontComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'loyalty-program',
            component: LoyaltyProgramComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'add-ons',
            component: AddOnsIntegrationsComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'role-permissions',
            component: RolesPermissionsComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'configurations',
            component: ConfigPageComponent,
            canActivate: [AuthGuard],
          }

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
