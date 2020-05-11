import {NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const appRoutes:Routes = [
    {path: '', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
   ];
   
@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule{

}