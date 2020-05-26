import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthInterface } from './auth.interface';
import { environment } from 'src/environments/environment';
import { AuthDebugService } from './auth.debug.service';


@Injectable({
  providedIn: 'root', 
})
export class AuthService{
    
    service: AuthInterface;

    constructor(private http: HttpClient, private router: Router) { 
        //TODO: provide a release/production one that communicates with an actual back end
        this.service = environment.production  ? new AuthDebugService(this.http, this.router) : new AuthDebugService(this.http, this.router);
    }
}