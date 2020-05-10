import {NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TimeComponent } from './time/time/time.component';

const appRoutes:Routes = [
    {path: '', redirectTo: '/auth', pathMatch: 'full'},
    {path: 'auth', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'time', component: TimeComponent},
    // {path: '', redirectTo: '/recipe', pathMatch: 'full' },
    // {path: 'recipe', loadChildren: () => import('./Recipe/recipe.module').then(m => m.RecipeModule) },
    // {path: 'auth', loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule)},
    // {path: 'shopping-list', loadChildren: () => import('./Shopping/shopping.module').then(m => m.ShoppingModule)},
   ];

   
@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}), ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}