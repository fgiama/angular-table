import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/entities/appSettings';
import { SelectItem } from 'primeng/api';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  appSettings: AppSettings;
  pagingEnabled: boolean;
  selectedState: string;
  states: SelectItem[];

  constructor(private settingService: SettingService, private router: Router) { 
  }

  ngOnInit() {
    this.loadSettings();
    this.loadStates();
  }

  loadSettings() {
    this.appSettings = this.settingService.getStoredSettings();
    if(this.appSettings) 
    {
      this.selectedState = this.appSettings.stateStorage;
    }
    else { //initialize with default settings
      this.appSettings = new AppSettings(); 
      this.appSettings.showColumnFiltering = false;
      this.appSettings.lazyMode = false;
      this.appSettings.showExport = false;
      this.appSettings.showGlobalFiltering = false;
      this.appSettings.showPaging = false;
      this.appSettings.showSorting = false;
      this.appSettings.stateKey = "statedemo-session";
      this.appSettings.stateStorage = "session";
      this.appSettings.needStorage = false;
    }
  }

  loadStates() {
    this.states = [
      { label: '--', value: ''},
      { label: 'Session Storage', value: 'session'},
      { label: 'Local Storage', value: 'local'}
    ];
  }

  showTable(): void
  {
    this.settingService.resetTableStorage(this.selectedState);
    switch(this.selectedState)
    {
      case "session":
        this.appSettings.stateKey = "statedemo-session";
        this.appSettings.stateStorage = "session";
        this.appSettings.needStorage = true;
        break;
      case "local":
        this.appSettings.stateKey = "statedemo-local";
        this.appSettings.stateStorage = "local";
        this.appSettings.needStorage = true;
        break;
      default:
          this.appSettings.stateKey = "statedemo-session";
          this.appSettings.stateStorage = "session";
          this.appSettings.needStorage = false;
          break;
    }
    this.settingService.setSettingsToStorage(this.appSettings);
    
    this.router.navigate(['table']);
  }

  handleLazyChange(event: any) {
    if(event.checked)
    {
      this.appSettings.showPaging = true;
      this.pagingEnabled = false;
    }
    else{
      this.pagingEnabled = true;
    }
  }

  resetSettings(): void {
    this.settingService.clearStorage();
    this.appSettings = new AppSettings(); 
  }

}
