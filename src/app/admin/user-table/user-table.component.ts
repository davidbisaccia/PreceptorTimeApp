import { Component, OnInit } from '@angular/core';
import { UserDataStorageService } from 'src/app/shared/service/user-data-storage.service';
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

  targetUserUpdateStatus: UserInfo = null;
  targetUserResetPassword: UserInfo = null;

  constructor(private userService: UserDataStorageService) { }

  ngOnInit(): void {
    this.userService.service.getUsers().subscribe(users => {
      this.users = users;
    }, error => {
      this.errorMsg = error;
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
