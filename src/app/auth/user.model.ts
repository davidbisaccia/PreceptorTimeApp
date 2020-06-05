export class User{
    constructor(public email: string, public id: string, public displayName: string, 
                public accountType: string, private _token: string, public tokenExpirationDate: Date){}

    get token(): string{
        if(!this.tokenExpirationDate || new Date() > this.tokenExpirationDate){
            return null;
        }
        
        return this._token;
    }

    get isLearner(): boolean{
        return this.accountType === 'student' || this.accountType === 'resident';
    }

    get isPreceptor(): boolean {
        return this.accountType === 'preceptor' || this.isAdmin;
    }

    get isAdmin(): boolean{
        return this.accountType === 'admin';
    }


}