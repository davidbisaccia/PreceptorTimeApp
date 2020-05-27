import { Observable } from 'rxjs';
import { UserInfo } from '../userInfo.model';

export interface UserDataStorageServiceInterface {
    getPreceptors: () => Observable<UserInfo[]>;
    getLearners: () =>Observable<UserInfo[]>;
    getUsers: () => Observable<UserInfo[]>;
    resetUserPassword: (userId: number, pass: string) => Observable<boolean>;
    changeAccountStatus: (userId: number, active: boolean) => Observable<boolean>;
}