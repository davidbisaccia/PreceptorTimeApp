import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
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
  isAuthenticated: boolean = false;
  userSub: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.auth.userSub.subscribe(
      (user) => {
        if(user === null){
          this.isAuthenticated = false;
          this.allowAdmin = false;
          this.allowReports = false;
        }
        else {
          this.isAuthenticated = true;
          this.allowReports = user.isAdmin || user.isPreceptor;
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
    this.auth.logOut();
  }

}
