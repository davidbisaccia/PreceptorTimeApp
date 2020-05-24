import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AdminComponent } from './admin/admin/admin.component';
import { UserTableComponent } from './admin/user-table/user-table.component';
import { ResetPasswordBoxComponent } from './admin/reset-password-box/reset-password-box.component';
import { UpdateAccountStatusBoxComponent } from './admin/update-account-status-box/update-account-status-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    UserTableComponent,
    ResetPasswordBoxComponent,
    UpdateAccountStatusBoxComponent,
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
