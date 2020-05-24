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

  onAccountStatusChange(id: number){
    this.isUpdating = true;
    let u = this.users.find((v, i, arr) => v.id === id);
    if(u !== undefined){
      let sub = this.userService.changeAccountStatus(u.id, !u.active).subscribe(success => {
        if(success) {
          u.active = !u.active;
        }
        else {
          this.errorMsg = 'Account not found, status was not changed.';
        }

        this.isUpdating = false;
      }, error => {
        this.errorMsg = 'Account not found, status was not changed.';
        this.isUpdating = false;
      });
    }
    else {
      this.errorMsg = 'Account not found, status was not changed.';
      this.isUpdating = false;
    }
  }

}
