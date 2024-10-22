import { Component } from '@angular/core';
import {User} from '../../../model/user';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  user: User | null = null;
  dropdownOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  async loadCurrentUser(): Promise<void> {
    try {
      const response = await this.authService.getCurrentUser();
      if (response && response.status === 200) {
        this.user = response.data as User;
        console.log(this.user);
      } else {
        console.error('Failed to load current user:', response.message);
      }
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  }



  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  async logout() {
    // Implement your logout logic here
    await this.authService.logout();
  }

}
