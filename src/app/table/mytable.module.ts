import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule} from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SettingsComponent } from './settings/settings.component';
import { MyTableComponent } from './my-table/my-table.component';
import { ToolbarModule } from 'primeng/toolbar';
import { FieldsetModule } from 'primeng/fieldset';
import { DataStoreService } from '../services/dataStore.service';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [MyTableComponent, SettingsComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    FieldsetModule,
    InputSwitchModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule
  ],
  providers: [DataStoreService]
})
export class MyTableModule { }
