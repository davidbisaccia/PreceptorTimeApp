import {NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';

const appRoutes:Routes = [
    {path: '', redirectTo: '/auth', pathMatch: 'full'},
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    {path: 'time', loadChildren: () => import('./time/time.module').then(m => m.TimeModule)},
    {path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)},
    {path: 'admin', component: AdminComponent}
   ];

   
@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}), ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}