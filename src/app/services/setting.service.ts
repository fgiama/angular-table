import { Injectable } from '@angular/core';
import { AppSettings } from '../entities/appSettings';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor() { }

  getStoredSettings(): AppSettings {
    return JSON.parse(localStorage.getItem('appSettings'));
  }

  setSettingsToStorage(appSettings: AppSettings): void {
      localStorage.setItem('appSettings', JSON.stringify(appSettings));
  }

  clearStorage()
  {
    localStorage.clear();
  }

  resetTableStorage(state: string) 
  {
    switch(state)
    {
      case "session":
        localStorage.removeItem("statedemo-local");
        break;
      case "local":
        sessionStorage.removeItem("statedemo-session");
        break;
      default:
          localStorage.removeItem("statedemo-local");
          sessionStorage.removeItem("statedemo-session");
        break;
    }
  }

}
