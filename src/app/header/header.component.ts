import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  allowReports: boolean = false
  allowAdmin: boolean = false;
  isTeacher: boolean = false;
  isAuthenticated: boolean = false;
  userSub: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.auth.service.userSub.subscribe(
      (user) => {
        if(user === null){
          this.isAuthenticated = false;
          this.allowAdmin = false;
          this.allowReports = false;
          this.isTeacher = false;
        }
        else {
          this.isAuthenticated = true;
          this.isTeacher = user.isPreceptor;
          this.allowReports = true;
          this.allowAdmin = user.isAdmin;
          console.log(user);
          console.log(user.isAdmin);
        }
      }
    );
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  onLogOut(){
    this.auth.service.logOut();
  }

}
