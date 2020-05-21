import {NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes:Routes = [
    {path: '', redirectTo: '/auth', pathMatch: 'full'},
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    {path: 'time', loadChildren: () => import('./time/time.module').then(m => m.TimeModule)},
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