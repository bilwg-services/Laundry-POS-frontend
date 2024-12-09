import { Component } from '@angular/core';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrl: './config-page.component.scss'
})
export class ConfigPageComponent {
  timeZones: string[] = ['Asia/Calcutta (+05:30)', 'UTC', 'America/New_York', 'Europe/London'];
  dateFormats: string[] = ['DD_MM_YYYY', 'MM_DD_YYYY', 'YYYY_MM_DD'];
  timeFormats: string[] = ['HOUR_12_FORMAT', 'HOUR_24_FORMAT'];
  currencies: string[] = ['Indian rupee', 'US Dollar', 'Euro'];
  languages: string[] = ['English', 'Hindi', 'French'];

  timeZone: string = this.timeZones[0];
  dateFormat: string = this.dateFormats[0];
  timeFormat: string = this.timeFormats[0];
  currency: string = this.currencies[0];
  language: string = this.languages[0];

  saveSettings() {
    const settings = {
      timeZone: this.timeZone,
      dateFormat: this.dateFormat,
      timeFormat: this.timeFormat,
      currency: this.currency,
      language: this.language,
    };
    console.log('Settings Saved:', settings);
    alert('Settings saved successfully!');
  }
}