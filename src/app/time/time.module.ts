import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeEditBoxComponent } from './time-edit-box/time-edit-box.component';
import { TimeEntryTableComponent } from './time-entry-table/time-entry-table.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TimeRoutingModule } from './time.routing-module';
import { TimeComponent } from './time/time.component';



@NgModule({
  declarations: [
    TimeComponent,
    TimeEditBoxComponent,
    TimeEntryTableComponent,
  ],
  imports: [
    CommonModule,
    TimeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class TimeModule { }
