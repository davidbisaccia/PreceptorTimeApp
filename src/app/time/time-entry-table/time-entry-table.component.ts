import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeEntryDisplay } from '../model/time-entry.model';
import { AuthServiceProvider } from 'src/app/auth/service/auth.service.provider';
import { TimeServiceProvider } from '../service/time.service.provider';
import { Subscription } from 'rxjs';
import { UserDataStorageServiceProvider } from 'src/app/shared/service/user-data-storage.service.provider';
import { UserInfo } from 'src/app/shared/userInfo.model';
import { TimeServiceInterface } from '../service/time.service.interface';

@Component({
  selector: 'app-time-entry-table',
  templateUrl: './time-entry-table.component.html',
  styleUrls: ['./time-entry-table.component.css']
})
export class TimeEntryTableComponent implements OnInit, OnDestroy {

  timeEntries: TimeEntryDisplay[];
  isLearner: boolean;
  isPreceptor: boolean;
  isLoading: boolean = false;
  userSub: Subscription;
  loadFailure: boolean =  false;
  userDisplayName: string = null;

  selectedEditEntry: TimeEntryDisplay = null;
  students: UserInfo[] = [];
  private timeService: TimeServiceInterface;

  constructor(private auth: AuthServiceProvider, private time: TimeServiceProvider, private userService: UserDataStorageServiceProvider) { }

  ngOnInit(): void {
    this.timeService = this.time.service;
    this.userSub = this.auth.service.userSub.subscribe(user => {
      if(user === null){
        this.isPreceptor = false;
        this.isLearner = false;
        this.userDisplayName = null;
        this.timeEntries = [];
        return;
      }

    this.userService.service.getLearners().subscribe(learners => {
      this.students = learners;
    }, error => {
        //todo
    });
      
      this.userDisplayName = user.displayName;
      this.isLearner = user.isLearner;
      this.isPreceptor = user.isPreceptor || user.isAdmin;
      let getMethod = this.isLearner ? this.timeService.getLearnerTimeEntries(+user.id) : this.timeService.getPreceptorTimeEntries(+user.id);

      this.isLoading = true;
      //TODO: maybe we need the other one, that holds onto the last thingy
      getMethod.subscribe(
        times => {
        this.timeEntries = times;
        this.isLoading = false;
      }, error => {
          this.loadFailure = true;
          this.isLoading = false;
        });
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  //add button
  onAddEntry(){
    let t = new TimeEntryDisplay();
    t.id = -1;
    this.selectedEditEntry = t;
  }  

  //edit button
  onEditEntry(entry: TimeEntryDisplay){
    this.selectedEditEntry = entry;
  }

  //return data from edit button event
  handleUpdatedEntry(entry: TimeEntryDisplay){
    //this is important, and will close the edit item
    this.selectedEditEntry = null;

    if(entry === null) return;

    this.isLoading = true;
    //console.log(this.timeEntries.map((val, idx, arr) => val.id));
    let index = this.timeEntries.findIndex((val, idx, arr) => val.id === entry.id);
    if(index === -1){
      //new entry
      this.timeEntries.unshift(entry);
    }
    else {
      this.timeEntries[index] = entry;
    }

    this.isLoading = false;
  }

  //delete button
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
        }
      }, error => {
        this.isLoading = false;
    });
  }

}
