import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../user.model';
import { RegisterData } from '../register-data.model';

export interface AuthServiceInterface {
    userSub: BehaviorSubject<User>;

    logIn: (email: string, password: string) => Observable<User>;
    registerAccount: (data: RegisterData) => Observable<User>;
    logOut: () => void;
    autoLogOut: (expirationDurationMSecs: number) => void;
    autoLogin: () => void;
}