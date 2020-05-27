import { Injectable } from '@angular/core';
import { TimeServiceInterface } from './time.interface';
import { environment } from 'src/environments/environment';
import { TimeDebugService } from './time.debug.service';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  service: TimeServiceInterface;

  constructor() {
    //TODO: provide a release/production one that communicates with an actual back end
    this.service = environment.production ? new TimeDebugService() : new TimeDebugService();
  }
}
