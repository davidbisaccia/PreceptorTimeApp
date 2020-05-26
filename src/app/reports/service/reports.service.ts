import { Injectable } from '@angular/core';
import { ReportsInterface } from './reports.interface';
import { environment } from 'src/environments/environment';
import { ReportsDebugService } from './reports.debug.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  service: ReportsInterface;

    constructor() { 
        //TODO: provide a release/production one that communicates with an actual back end
        this.service = environment.production  ? new ReportsDebugService() : new ReportsDebugService();
    }
}
