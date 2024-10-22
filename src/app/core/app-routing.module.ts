import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../ui/pages/auth/login/login.component';
import { DashboardComponent } from '../ui/pages/dashboard/dashboard.component';
import { LandingComponent } from '../ui/pages/landing/landing.component';
import { AllCustomersComponent } from '../ui/pages/customers/all-customers/all-customers.component';
import {AuthGuard} from '../guard/auth.guard';
import {LoginGuard} from '../guard/login.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard] // Prevent logged-in users from accessing login
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
        canActivate: [AuthGuard] // Protect with AuthGuard
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
