import {NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeComponent } from './time/time.component';

const appRoutes:Routes = [
    {path: '', component: TimeComponent},
   ];
   
@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class TimeRoutingModule{

}