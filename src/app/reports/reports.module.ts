import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';
import { ReportsSearchComponent } from './reports-search/reports-search.component';
import { ReportsTableComponent } from './reports-table/reports-table.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportsRoutingModule } from './reports.routing.module';



@NgModule({
  declarations: [
    ReportsComponent,
    ReportsSearchComponent,
    ReportsTableComponent, 
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class ReportsModule { }
