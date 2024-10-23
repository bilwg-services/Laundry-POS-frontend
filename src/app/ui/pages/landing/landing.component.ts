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
  darkMode: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.updateBodyClass();
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


  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString());
    this.updateBodyClass();
  }

  private updateBodyClass(): void {
    if (this.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  async logout() {
    // Implement your logout logic here
    await this.authService.logout();
  }


  

}
