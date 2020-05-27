import { Injectable } from '@angular/core';
import { TimeServiceInterface } from './time.service.interface';
import { environment } from 'src/environments/environment';
import { TimeNoBackendService } from './time.nobackend.service';

@Injectable({
  providedIn: 'root'
})
export class TimeServiceProvider {

  service: TimeServiceInterface;

  constructor() {
    //TODO: provide a release/production one that communicates with an actual back end
    this.service = environment.backendService === 'FakeBackEnd' ? new TimeNoBackendService() : new TimeNoBackendService();
  }
}
