import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ReportsComponent } from './reports/reports/reports.component';
import { ReportsTableComponent } from './reports/reports-table/reports-table.component';
import { ReportsSearchComponent } from './reports/reports-search/reports-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReportsComponent,
    ReportsTableComponent,
    ReportsSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],  
  bootstrap: [AppComponent]
})
export class AppModule { }
