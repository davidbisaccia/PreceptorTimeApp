export class User{
    constructor(public email: string, public id: string, public displayName: string, 
                public accountType: string, private _token: string, private _tokenExpirationDate: Date){}

    get token(): string{
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        
        return this._token;
    }

    get isLearner(): boolean{
        return this.accountType === 'student' || this.accountType === 'resident';
    }

    get isPreceptor(): boolean {
        return this.accountType === 'preceptor';
    }

    get isAdmin(): boolean{
        return this.accountType === 'admin';
    }


}