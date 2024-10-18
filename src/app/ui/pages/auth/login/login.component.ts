import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  onSubmit() {
    // Handle login logic here
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Add authentication logic
  }

}
