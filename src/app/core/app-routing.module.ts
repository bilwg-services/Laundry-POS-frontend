import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../ui/pages/auth/login/login.component';
import { DashboardComponent } from '../ui/pages/dashboard/dashboard.component';
import { LandingComponent } from '../ui/pages/landing/landing.component';
import { AllCustomersComponent } from '../ui/pages/customers/all-customers/all-customers.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
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
      },
      {
        path: 'customer',
        component: AllCustomersComponent,
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
