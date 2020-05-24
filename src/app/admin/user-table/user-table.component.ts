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

  constructor(private userService: UserDataStorageService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    }, error => {
      this.errorMsg = error;
    });
  }

  onActiveChanged(id: number){
    let u = this.users.find((v, i, arr) => v.id === id);
    if(u !== undefined){
      u.active = !u.active;
    }
  }

}
