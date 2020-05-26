import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth/service/auth.service';

@Injectable({providedIn: 'root'})
export class AuthLoggedInGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        //check for a logged in user
        return this.authService.service.userSub.pipe(
            take(1),
            map( user => {
            const isAuth = !!user;
            if(isAuth){
                return true;
            }

            return this.router.createUrlTree(['/auth']);
        }));
    }
    
}