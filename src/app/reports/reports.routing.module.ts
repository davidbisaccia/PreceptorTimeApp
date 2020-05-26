import {NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { AuthLoggedInGuard } from '../shared/auth.loggedin.guard';

const appRoutes:Routes = [
    {path: '', component: ReportsComponent, canActivate: [AuthLoggedInGuard]},
   ];
   
@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule{

}