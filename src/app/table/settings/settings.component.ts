import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/entities/appSettings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  appSettings: AppSettings;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    this.appSettings = JSON.parse(localStorage.getItem('appSettings'));
    if(!this.appSettings) //initialize with default settings
    {
      this.appSettings = new AppSettings(); 
      this.appSettings.showColumnFiltering = false;
      this.appSettings.lazyMode = false;
      this.appSettings.showExport = false;
      this.appSettings.showGlobalFiltering = false;
      this.appSettings.showPaging = false;
      this.appSettings.showSorting = false;
      this.appSettings.stateKey = "statedemo-session";
      this.appSettings.stateStorage = "session";
    }
  }

  showTable(): void
  {
    localStorage.setItem('appSettings', JSON.stringify(this.appSettings));
    this.router.navigate(['table']);
  }

}
