import { Injectable } from '@angular/core';
import { UserInfo } from '../userInfo.model';
import { Observable } from 'rxjs';
import { UserDataStorageServiceInterface } from './user-data-storage.service..interface';
import { environment } from 'src/environments/environment';
import { UserDataStorageNoBackendService } from './user-data-storage.nobackend.service';
import { UserDataStorageWebApiService } from './user-data-storage.webapi.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataStorageServiceProvider {

  public service: UserDataStorageServiceInterface;

  constructor(private http: HttpClient) {
    //TODO: provide a release/production one that communicates with an actual back end
    this.service = environment.backendService === 'FakeBackEnd' ? new UserDataStorageNoBackendService() : new UserDataStorageWebApiService(http);
   }

}
