import { Injectable } from '@angular/core';
import { ReportsServiceInterface } from './reports.service.interface';
import { environment } from 'src/environments/environment';
import { ReportsNoBackendService } from './reports.nobackend.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsServiceProvider {

  service: ReportsServiceInterface;

    constructor() { 
        //TODO: provide a release/production one that communicates with an actual back end
        this.service = environment.backendService === 'FakeBackEnd'  ? new ReportsNoBackendService() : new ReportsNoBackendService();
    }
}
