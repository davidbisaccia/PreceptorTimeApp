import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthServiceInterface} from './auth.service.interface';
import { environment } from 'src/environments/environment';
import { AuthNoBackendService } from './auth-nobackend.service';


@Injectable({
  providedIn: 'root', 
})
export class AuthServiceProvider{
    
    service: AuthServiceInterface;

    constructor(private http: HttpClient, private router: Router) { 
        //TODO: provide a release/production one that communicates with an actual back end
        this.service = environment.backendService === 'FakeBackEnd'  ? new AuthNoBackendService(this.http, this.router) : new AuthNoBackendService(this.http, this.router);
    }
}