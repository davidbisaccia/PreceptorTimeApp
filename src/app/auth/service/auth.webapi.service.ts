import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user.model';

import { throwError, timer } from 'rxjs';
import { RegisterData } from '../register-data.model'; 
import { AuthServiceInterface } from './auth.service.interface';
import { LogInDto } from './dto/login-dto.model';
import { catchError, tap, take, map } from 'rxjs/operators';
import { LogOutDto } from './dto/logout-dto.model';

export class AuthWebApiService implements AuthServiceInterface {

  userSub = new BehaviorSubject<User>(null);
  private controllerPath: string = 'https://localhost:44329/api/auth/';

  constructor(private http: HttpClient, private router: Router) { }

  logIn(email: string, password: string): Observable<User> {
    const httpPath = this.controllerPath + 'login';
    const dto = new LogInDto(email, password);
    return this.http.post<User>(httpPath, dto)
    .pipe(catchError(this.handleError),
      map( data => {
        data.tokenExpirationDate = new Date(data.tokenExpirationDate.toString());
        return data;
      }),
      tap(
        resp => {
          let loggedInUser = new User(resp.email, resp.id, resp.displayName, resp.accountType, resp.token, new Date(resp.tokenExpirationDate.toString()));
          this.handleAuthentication(loggedInUser);
        })
    );
  }

  registerAccount(data: RegisterData): Observable<User>{
    const httpPath = this.controllerPath + 'register';
    return this.http.post<User>(httpPath, data)
    .pipe(catchError(this.handleError),
    tap(
      resp => {
        let registeredUser = new User(resp.email, resp.id, resp.displayName, resp.accountType, resp.token, new Date(resp.tokenExpirationDate.toString()));
        this.handleAuthentication(registeredUser);
      }
    ));
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

  private handleAuthentication(user: User){
    this.userSub.next(user);
    
    let currentTime = new Date();
    let msecs =  user.tokenExpirationDate.getTime() - currentTime.getTime();
    console.log(msecs);
    this.autoLogOut(msecs);
    
    //store for auto re-login latter
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logOut(){
    // this.userSub.pipe(take(1),
    //   map( user => {
        const httpPath = this.controllerPath + 'logout';
        let dto = new LogOutDto(this.userSub.value.email, this.userSub.value.token);
        this.http.post<LogOutDto>(httpPath, dto).subscribe();
    //   })
    // );

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
