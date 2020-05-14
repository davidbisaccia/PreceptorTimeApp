import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TimeEntry } from '../model/time-entry.model';
import { TimeService } from '../time.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-time-edit-box',
  templateUrl: './time-edit-box.component.html',
  styleUrls: ['./time-edit-box.component.css']
})
export class TimeEditBoxComponent implements OnInit, OnDestroy {

  @Output() close = new EventEmitter<TimeEntry>();
  @Input() entry: TimeEntry;
  isEditMode : boolean;
  editEntryId : number = -1;
  userId: string;
  editTimeEntryForm: FormGroup;
  isBusy: boolean = false;
  errorMsg: string = null;

  userSub : Subscription;

  constructor(private timeService: TimeService, private auth: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.auth.userSub.subscribe(user => {
      this.userId = user.id;
    });


    this.isEditMode = this.entry !== null;
    this.editEntryId = this.entry ? this.entry.id : -1;

    let dp = new DatePipe(navigator.language);
    let p = 'y-MM-dd'; // YYYY-MM-DD

    this.editTimeEntryForm = new FormGroup({
      'preceptor': new FormControl(this.entry ? this.entry.preceptor : null, [Validators.required]),
      'student': new FormControl(this.entry ? this.entry.student : null, [Validators.required]),
      'rotation': new FormControl(this.entry ? this.entry.rotation : null, [Validators.required]),
      'hours': new FormControl(this.entry ? this.entry.hours : null, [Validators.required, Validators.min(1), Validators.max(24)]),
      'date': new FormControl(this.entry ? dp.transform(this.entry.date, p) : new Date(), [Validators.required]),
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
    this.userSub.unsubscribe();
  }

  //TODO: handle and add
  onUpdate(){
    this.errorMsg = null;

    if(this.isEditMode){
      this.isBusy = true;
      let updatedEntry = this.getFormData();
      this.timeService.editTimeEntry(updatedEntry).subscribe(success => {
        if(success){
          this.isBusy = false;
          console.log('onUpdate');
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
  }

  onClose(entry: TimeEntry){
    this.errorMsg = null;
    this.close.emit(entry);
  }
}
