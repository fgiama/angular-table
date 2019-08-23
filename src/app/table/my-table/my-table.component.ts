import { Component, OnInit, Input } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { DataStoreService } from 'src/app/services/dataStore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from 'src/app/entities/appSettings';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements OnInit {

  list: any;
  cols: any[];
  columnsCount: number;
  totalRecords: number;
  tableSettings: AppSettings;
  loading: boolean;

  constructor(private dataStore: DataStoreService, private settingService: SettingService, private router: Router) { }

  ngOnInit() { 
    this.loadSettings();
    this.loadData();
    this.createColumns();
    this.loading = this.tableSettings.lazyMode;
  }

  loadSettings() {
    this.tableSettings = this.settingService.getStoredSettings();
    if(this.tableSettings)
    {
      if(!this.tableSettings.needStorage)
      {
        this.settingService.resetTableStorage("");
      }
    }
    else { //initialize with default settings
      this.tableSettings = new AppSettings(); 
      this.tableSettings.showColumnFiltering = false;
      this.tableSettings.lazyMode = false;
      this.tableSettings.showExport = false;
      this.tableSettings.showGlobalFiltering = false;
      this.tableSettings.showPaging = false;
      this.tableSettings.showSorting = false;
      this.tableSettings.hasStickyHeader = false;
      this.tableSettings.stateKey = "statedemo-session";
      this.tableSettings.stateStorage = "session";
      this.tableSettings.needStorage = false;
    }
  }

  loadData() {
    if(!this.tableSettings.lazyMode) {
      this.dataStore.getData().subscribe(data => {
        this.list=data;
      });
    }
  }

  createColumns() {
    this.cols = [
      { field: 'id', header: 'Id', type: 'text', filter: 'text' },
      { field: 'name', header: 'Country', type: 'text', filter: 'text' },
      { field: 'capital', header: 'Capital', type: 'text', filter: 'text' },
      { field: 'population', header: 'Population', type: 'text', filter: 'text' },
      { field: 'region', header: 'Region', type: 'text', filter: 'text' },
    ];
    this.columnsCount = this.cols.length + 1;
  }
  
  loadRowsLazy(event: LazyLoadEvent) {
    this.loading = true;
    this.tableSettings = this.settingService.getStoredSettings();
   
    this.dataStore.getDataLazy(event.first, event.rows, event.sortField, event.sortOrder, event.filters)
    .subscribe(data => {
      this.totalRecords = data.totalRecords;
      this.list = data.list;
      this.loading = false;
    });
     
    
  }

  showSettings(): void
  {
    this.router.navigate(['settings']);
  }
  
  onRowSelect(event) {
    //TODO
  }

  showDialogToAdd() {
  }

  onRowEditInit(item: any) {
    //TODO
  }

  onRowEditSave(item: any) {
    //TODO
  }

  onRowEditCancel(item: any, index: number) {
    //TODO
  }
  
  clearFilters() {
    //TODO
  }
}
