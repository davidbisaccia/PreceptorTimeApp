import { Injectable } from '@angular/core';
import { UserInfo } from '../userInfo.model';
import { Observable } from 'rxjs';
import { UserDataStorageInterface } from './user-data-storage.interface';
import { environment } from 'src/environments/environment';
import { UserDataStorageDebugService } from './user-data-storage.debug.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataStorageService {

  public service: UserDataStorageInterface;

  constructor() {
    //TODO: provide a release/production one that communicates with an actual back end
    this.service = environment.production ? new UserDataStorageDebugService() : new UserDataStorageDebugService();
   }

}
