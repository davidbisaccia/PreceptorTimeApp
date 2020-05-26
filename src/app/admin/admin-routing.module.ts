import {NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthAdminGuard } from '../shared/auth.admin.guard';

const appRoutes:Routes = [
    {path: '', component: AdminComponent, canActivate: [AuthAdminGuard]},
   ];
   
@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{

}