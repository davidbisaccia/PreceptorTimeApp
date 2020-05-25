import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { ResetPasswordBoxComponent } from './reset-password-box/reset-password-box.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UpdateAccountStatusBoxComponent } from './update-account-status-box/update-account-status-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    AdminComponent,
    ResetPasswordBoxComponent,
    UpdateAccountStatusBoxComponent,
    UserTableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class AdminModule { }
