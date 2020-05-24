import { Component, OnInit } from '@angular/core';
import { UserDataStorageService } from 'src/app/shared/user-data-storage.service';
import { UserInfo } from 'src/app/shared/userInfo.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  users: UserInfo[]= [];
  errorMsg: string = null;
  isUpdating: boolean = false;

  private targetUserUpdateStatus: UserInfo = null;
  private targetUserResetPassword: UserInfo = null;

  constructor(private userService: UserDataStorageService) { }

  ngOnInit(): void {
    let sub = this.userService.getUsers().subscribe(users => {
      this.users = users;
      sub.unsubscribe();
    }, error => {
      this.errorMsg = error;
      sub.unsubscribe();
    });
  }

  onResetPassword(user: UserInfo){
    if(user !== null){
      this.targetUserResetPassword = user;
    }
  }

  closePasswordResetBox(){
    this.targetUserResetPassword = null;
  }

  onAccountStatusChange(user: UserInfo){
    this.targetUserUpdateStatus = user;
  }

  closeUpdateAccountStatusBox(success: boolean){
    if(success && this.targetUserUpdateStatus !== null){
      this.targetUserUpdateStatus.active = !this.targetUserUpdateStatus.active;
    }

    this.targetUserUpdateStatus = null;
  }

}
