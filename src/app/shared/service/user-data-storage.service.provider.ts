import { Injectable } from '@angular/core';
import { UserInfo } from '../userInfo.model';
import { Observable } from 'rxjs';
import { UserDataStorageServiceInterface } from './user-data-storage.service..interface';
import { environment } from 'src/environments/environment';
import { UserDataStorageNoBackendService } from './user-data-storage.nobackend.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataStorageServiceProvider {

  public service: UserDataStorageServiceInterface;

  constructor() {
    //TODO: provide a release/production one that communicates with an actual back end
    this.service = environment.production ? new UserDataStorageNoBackendService() : new UserDataStorageNoBackendService();
   }

}
