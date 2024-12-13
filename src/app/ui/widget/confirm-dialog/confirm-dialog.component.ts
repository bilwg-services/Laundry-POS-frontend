import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

  isDarkMode: boolean = false;

  constructor() {
    // Update this logic based on your application's dark mode state
    this.isDarkMode = document.body.classList.contains('dark');
  }

}
