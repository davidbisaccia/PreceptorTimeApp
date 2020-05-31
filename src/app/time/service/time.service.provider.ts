import { Injectable } from '@angular/core';
import { TimeServiceInterface } from './time.service.interface';
import { environment } from 'src/environments/environment';
import { TimeNoBackendService } from './time.nobackend.service';
import { HttpClient } from '@angular/common/http';
import { TimeWebApiService } from './time.webapi.service';

@Injectable({
  providedIn: 'root'
})
export class TimeServiceProvider {

  service: TimeServiceInterface;

  constructor(private http: HttpClient) {
    this.service = environment.backendService === 'FakeBackEnd' ? new TimeNoBackendService() : new TimeWebApiService(this.http);
  }
}
