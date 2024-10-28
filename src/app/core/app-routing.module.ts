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
        path: 'staff-management',
        component: AllStaffsComponent,
        canActivate: [AuthGuard], // Protect with AuthGuard
      },
      {
        path: 'staff-management/new',
        component: NewStaffComponent,
        canActivate: [AuthGuard], // Protect with AuthGuard
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
