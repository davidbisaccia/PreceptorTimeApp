import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { TimeComponent } from './time/time/time.component';
import { HttpClientModule } from '@angular/common/http';
import { TimeEntryTableComponent } from './time/time-entry-table/time-entry-table.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TimeComponent,
    TimeEntryTableComponent,
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
