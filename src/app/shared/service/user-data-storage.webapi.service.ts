import { Injectable } from '@angular/core';
import { UserInfo } from '../userInfo.model';
import { Observable } from 'rxjs';
import { UserDataStorageServiceInterface } from './user-data-storage.service..interface';
import { HttpClient } from '@angular/common/http';
import { ResetPasswordDto } from './dto/reset-password-dto.model';
import { UpdateAccountStatusDto } from './dto/update-account-status-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataStorageWebApiService implements UserDataStorageServiceInterface {

  private controllerPath: string = 'https://localhost:44329/api/userdata/';

  constructor(private http: HttpClient) {
   }

  getPreceptors(): Observable<UserInfo[]>{
    const httpPath = this.controllerPath + 'preceptors';
    return this.http.get<UserInfo[]>(httpPath);
  }

  getLearners(): Observable<UserInfo[]>{
    const httpPath = this.controllerPath + 'learners';
    return this.http.get<UserInfo[]>(httpPath);
  }

  getUsers(): Observable<UserInfo[]>{
    const httpPath = this.controllerPath + 'users';
    return this.http.get<UserInfo[]>(httpPath);
  }

  resetUserPassword(userId: number, pass: string): Observable<boolean> {
    const httpPath = this.controllerPath + 'reset';
    const dto = new ResetPasswordDto(userId, pass);
    return this.http.post<boolean>(httpPath, dto);
  }

  changeAccountStatus(userId: number, active: boolean): Observable<boolean> {
    const httpPath = this.controllerPath + 'update';
    const dto = new UpdateAccountStatusDto(userId, active);
    return this.http.post<boolean>(httpPath, dto);
  }

}
