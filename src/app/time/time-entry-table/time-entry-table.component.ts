import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeEntry } from '../model/time-entry.model';
import { AuthService } from 'src/app/auth/auth.service';
import { TimeService } from '../time.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-time-entry-table',
  templateUrl: './time-entry-table.component.html',
  styleUrls: ['./time-entry-table.component.css']
})
export class TimeEntryTableComponent implements OnInit, OnDestroy {

  timeEntries: TimeEntry[];
  isLearner: boolean;
  isPreceptor: boolean;
  isLoading: boolean = false;
  userSub: Subscription;
  loadFailure: boolean =  false;

  constructor(private auth: AuthService, private timeService: TimeService) { }

  ngOnInit(): void {
    this.userSub = this.auth.userSub.subscribe(user => {
      console.log(user);
      if(user === null){
        this.isPreceptor = false;
        this.isLearner = false;
        this.timeEntries = [];
        return;
      }
      
      this.isLearner = user.isLearner;
      this.isPreceptor = user.isPreceptor || user.isAdmin;
      let getMethod = this.isLearner ? this.timeService.getLearnerTimeEntries(+user.id) : this.timeService.getPreceptorTimeEntries(+user.id);

      this.isLoading = true;
      //TODO: maybe we need the other one, that holds onto the last thingy
      let tempSub = getMethod.subscribe(
        times => {
        this.timeEntries = times;
        this.isLoading = false;
        tempSub.unsubscribe();
        
      }, error => {
          this.loadFailure = true;
          this.isLoading = false;
        });
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onEditEntry(entry: TimeEntry){
    this.isLoading = true;
    //TODO: pop up edit form from here
    // this.timeService.editTimeEntry(entry).subscribe(
    //   success => {
    //     if(success){
    //       this.timeEntries = this.timeEntries.filter((value, index, arr) => value.id === id);
    //       this.isLoading = false;
    //     }
    //     else
    //     {
    //       this.isLoading = false;
    //       console.log('Todo show error message box here')
    //     }
    //   }, error => {
    //     this.isLoading = false;
    //     console.log('Todo show error message box here');
    // });
  }

  onDeleteEntry(id: number){
    this.isLoading = true;
    this.timeService.deleteTimeEntry(id).subscribe(
      success => {
        if(success){
          this.timeEntries = this.timeEntries.filter((value, index, arr) => value.id !== id);
          this.isLoading = false;
        }
        else
        {
          this.isLoading = false;
          console.log('Todo show error message box here')
        }
      }, error => {
        this.isLoading = false;
        console.log('Todo show error message box here');
    });
  }

}
