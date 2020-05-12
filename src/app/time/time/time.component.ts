import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { TimeEntry } from '../model/time-entry.model';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit, OnDestroy {

  isLearner: boolean = false;
  isPreceptor: boolean = false;
  userChanged: Subscription;

  timeEnties: TimeEntry[];

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.userChanged = this.auth.userSub.subscribe((user) => {
      if(user === null){
        this.isPreceptor = false;
        this.isLearner = false;
        //user.
      }
      else{
        this.isPreceptor = user.isPreceptor;
        this.isLearner = user.isLearner;
      }
    });
  }

  ngOnDestroy(): void {
    this.userChanged.unsubscribe();
  }


}
