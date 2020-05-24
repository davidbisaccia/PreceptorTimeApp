
//a less intense version of the user class that will mostly be used to match display names and ids
export class UserInfo {
    constructor(public id: number, public displayName: string, public accountType: string, public active: boolean){}
}