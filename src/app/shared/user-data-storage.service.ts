import { Injectable } from '@angular/core';
import { UserInfo } from './userInfo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataStorageService {

  private fakeData: UserInfo[] = [];

  private setupFakeDataForTestingWithNoBackend(){
    const p1 = new UserInfo(1, 'dave', 'preceptor', true);
    const p2 = new UserInfo(2, 'me', 'student', true);
    const p3 = new UserInfo(3, 'Brad', 'admin', true);
    const p4 = new UserInfo(4, 'MECEPTOR', 'preceptor', true);
    const p5 = new UserInfo(5, 'peeps', 'resident', true);
    const p6 = new UserInfo(6, 'other peeps', 'student', true);

    this.fakeData.push(p1);
    this.fakeData.push(p2);
    this.fakeData.push(p3);
    this.fakeData.push(p4);
    this.fakeData.push(p5);
    this.fakeData.push(p6);
  }

  constructor() {
    this.setupFakeDataForTestingWithNoBackend();
   }

  getPreceptors(): Observable<UserInfo[]>{
    let fakeObservable = Observable.create(obs => {
      setTimeout(() => {
        obs.next(this.fakeData.filter((v, i, ar) => v.accountType === 'preceptor' || v.accountType === 'admin').slice());
        obs.complete();
      }, 600);
    });

    return fakeObservable;
  }

  getLearners(): Observable<UserInfo[]>{
    let fakeObservable = Observable.create(obs => {
      setTimeout(() => {
        obs.next(this.fakeData.filter((v, i, ar) => v.accountType === 'student' || v.accountType === 'resident').slice());
        obs.complete();
      }, 600);
    });

    return fakeObservable;
  }

  getUsers(): Observable<UserInfo[]>{
    let fakeObservable = Observable.create(obs => {
      setTimeout(() => {
        obs.next(this.fakeData.slice());
        obs.complete();
      }, 600);
    });

    return fakeObservable;
  }

}
