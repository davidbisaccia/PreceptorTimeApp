import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TimeEntry } from '../model/time-entry.model';
import { TimeService } from '../time.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-time-edit-box',
  templateUrl: './time-edit-box.component.html',
  styleUrls: ['./time-edit-box.component.css']
})
export class TimeEditBoxComponent implements OnInit, OnDestroy {

  @Output() close = new EventEmitter<TimeEntry>();
  @Input() entry: TimeEntry;
  @Input() userDisplayName: string;
  isEditMode : boolean;
  editEntryId : number = -1;
  editTimeEntryForm: FormGroup;
  isBusy: boolean = false;
  errorMsg: string = null;

  userSub : Subscription;

  constructor(private timeService: TimeService, private auth: AuthService) { }

  ngOnInit(): void {
    console.log(this.userDisplayName);
    
    this.editEntryId = this.entry ? this.entry.id : -1;
    this.isEditMode = this.editEntryId !== -1;
    let preceptorName = this.isEditMode && this.entry ? this.entry.preceptor : this.userDisplayName; 

    console.log(preceptorName);
    let dp = new DatePipe(navigator.language); 
    let p = 'y-MM-dd'; // YYYY-MM-DD

    this.editTimeEntryForm = new FormGroup({
      'preceptor': new FormControl(preceptorName, [Validators.required]),
      'student': new FormControl(this.entry ? this.entry.student : null, [Validators.required]),
      'rotation': new FormControl(this.entry ? this.entry.rotation : null, [Validators.required]),
      'hours': new FormControl(this.entry ? this.entry.hours : null, [Validators.required, Validators.min(1), Validators.max(24)]),
      'date': new FormControl(this.entry ? dp.transform(this.entry.date, p) : dp.transform(new Date(), p), [Validators.required]),
      'notes': new FormControl(this.entry ? this.entry.notes : null),
    });
  }

  getFormData(): TimeEntry{
    let timeEntry = new TimeEntry();

    timeEntry.id = this.editEntryId;
    timeEntry.preceptor = this.editTimeEntryForm.get('preceptor').value;
    timeEntry.student = this.editTimeEntryForm.get('student').value;
    timeEntry.rotation = this.editTimeEntryForm.get('rotation').value;
    timeEntry.hours = this.editTimeEntryForm.get('hours').value;
    timeEntry.date = new Date(this.editTimeEntryForm.get('date').value);
    timeEntry.notes = this.editTimeEntryForm.get('notes').value;

    return timeEntry;
  }

  ngOnDestroy(): void {
    // this.userSub.unsubscribe();
  }

  //TODO: handle and add
  onUpdate(){
    this.errorMsg = null;

    if(this.isEditMode){
      this.handleUpdateTimeEntry();
    }
    else{
      this.handleNewTimeEntry();
    }

  }

  private handleNewTimeEntry(){
    this.isBusy = true;
    let newEntry = this.getFormData();
    this.timeService.addTimeEntry(newEntry).subscribe(id => {
      if(id > 0){
        this.isBusy = false;
        newEntry.id = id;
        this.onClose(newEntry);
      }
      else {
        this.errorMsg = 'An error occurred when submitting the new entry, please try again.';
          this.isBusy = false;
      }
    }, error => {
      this.errorMsg = error.message;
      this.isBusy = false;
    });
  }

  private handleUpdateTimeEntry(){
    this.isBusy = true;
      let updatedEntry = this.getFormData();
      this.timeService.editTimeEntry(updatedEntry).subscribe(success => {
        if(success){
          this.isBusy = false;
          this.onClose(updatedEntry);
        }
        else{
          this.errorMsg = 'An error occurred when submitting the updated entry, please try again.';
          this.isBusy = false;
        }
      }, error => {
          this.errorMsg = error.message;
          this.isBusy = false;
      });
  }

  onClose(entry: TimeEntry){
    this.errorMsg = null;
    this.close.emit(entry);
  }
}
