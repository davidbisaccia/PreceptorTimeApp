import {NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeComponent } from './time/time.component';
import { AuthLoggedInGuard } from '../shared/auth.loggedin.guard';

const appRoutes:Routes = [
    {path: '', component: TimeComponent, canActivate: [AuthLoggedInGuard]},
   ];
   
@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class TimeRoutingModule{

}