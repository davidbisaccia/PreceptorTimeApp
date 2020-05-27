import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { User } from '../user.model';

import { throwError, timer } from 'rxjs';
import { RegisterData } from '../register-data.model'; 
import { AuthServiceInterface } from './auth.service.interface';

export class AuthNoBackendService implements AuthServiceInterface {

  userSub = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) { }

  logIn(email: string, password: string): Observable<User> {
    //defaulting to admin for now....
    let fakeResp = {email: email, userId: '1', displayName: 'Professor', accountType: 'admin', idToken: '1', expiresIn: '3600'};

    this.handleAuthentication(fakeResp.email, fakeResp.accountType, fakeResp.userId, fakeResp.displayName, fakeResp.idToken, +fakeResp.expiresIn);
    let fakeObservable = Observable.create(obs => {
      setTimeout(() => {
        obs.next([fakeResp]);
        obs.complete();
      }, 1500);
      
    });

    return fakeObservable;
    //TODO: below is the example of the real way I did this in my previous app
    // const httpPath = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +  + environment.firebaseApiKey;
    // return this.http.post<AuthResponseData>(httpPath, 
    //   {
    //     email: email,
    //     password: password,
    //     returnSecureToken: true
    //   }).pipe(catchError(this.handleError), 
    //   tap(
    //     responseData => {
    //       this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
    //     }
    //   ));
  }

  registerAccount(data: RegisterData): Observable<User>{
    //TODO: in the future make this real, when we setup the back end, we will to use handleError like the login stuff above when we are ready

    let fakeResp = {email: data.userName, userId: '1', displayName: 'Register-Professor', accountType: data.accountType, idToken: '1', expiresIn: '3600'};

    this.handleAuthentication(fakeResp.email, fakeResp.accountType, fakeResp.userId, fakeResp.displayName, fakeResp.idToken, +fakeResp.expiresIn);
    let fakeObservable = Observable.create(obs => {
      setTimeout(() =>
      {
        obs.next([fakeResp]);
        obs.complete();
      }, 1000);
    });

    return fakeObservable;
  }



  private handleError(errorResponse: HttpErrorResponse){
    //TODO: we need to figure what we will have error codes and messages based on our back end of choice
    if(!errorResponse.error || !errorResponse.error.error){
      return throwError('Unknown error has occurred.');
    }

    switch(errorResponse.error.error.message){
      case 'EMAIL_EXISTS':
        return throwError('Email already exists.');
      case 'OPERATION_NOT_ALLOWED':
        return throwError('Invalid operation: Sign in is currently disabled.');
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return throwError('Blocked all requests from this device due to unusual activity. Try again later.');
      case 'EMAIL_NOT_FOUND':
        return throwError('Email does not exists.');
      case 'INVALID_PASSWORD':
        return throwError('Invalid password.');
      case 'USER_DISABLED':
        return throwError('This account has been disabled by the administrator.');
      default:
        return throwError('Unknown error has occurred.')
    }
  }

  private handleAuthentication(email: string, accountType: string, userId: string, displayName: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(email, userId, displayName, accountType, token, expirationDate);

    this.userSub.next(user);
    //store for auto re-login latter
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logOut(){
    this.userSub.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  //auto login and logout
  private  tokenExpirationTimer: any;
  
  autoLogOut(expirationDurationMSecs: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDurationMSecs);
  }

  autoLogin(){

    const userData: {
      email: string,
      id: string,
      accountType: string,
      displayName: string,
      _token: string,
      _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));
    
    if(!userData){
      return;
    }

    const date = new Date(userData._tokenExpirationDate)
    const loadedUser = new User(userData.email, userData.id, userData.displayName, userData.accountType, userData._token, date);
    //make sure token is still valid
    if(loadedUser.token){
      this.userSub.next(loadedUser);
      
      const timeSpanMSecs = date.getTime() - new Date().getTime();
      this.autoLogOut(timeSpanMSecs);
    }
  }

}
