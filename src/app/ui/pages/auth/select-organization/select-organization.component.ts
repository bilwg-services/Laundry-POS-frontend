import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-organization',
  templateUrl: './select-organization.component.html',
  styleUrl: './select-organization.component.scss'
})
export class SelectOrganizationComponent {
  
  roles: any[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['roles']) {
      this.roles = navigation.extras.state['roles'];

      console.log('Roles:', this.roles);
    }
  }

  ngOnInit(): void {
    let darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  selectRole(role: any): void {
    localStorage.setItem('organizationId', role.organization_id);
    // Redirect to the desired page after selection
    this.router.navigate(['/dashboard']);
  }
}
