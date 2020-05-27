import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TimeEntryDisplay } from '../model/time-entry.model';
import { TimeService } from '../time.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { UserInfo } from 'src/app/shared/userInfo.model';

@Component({
  selector: 'app-time-edit-box',
  templateUrl: './time-edit-box.component.html',
  styleUrls: ['./time-edit-box.component.css']
})
export class TimeEditBoxComponent implements OnInit {

  @Output() close = new EventEmitter<TimeEntryDisplay>();
  @Input() entry: TimeEntryDisplay;
  @Input() students: UserInfo[]
  @Input() userDisplayName: string;
  isEditMode : boolean = true;
  editEntryId : number = -1;
  editTimeEntryForm: FormGroup;
  isBusy: boolean = false;
  errorMsg: string = null;
  preceptorId: number = -1;

  userSub : Subscription;

  constructor(private timeService: TimeService) { }

  ngOnInit(): void {
    //the un-editables
    this.editEntryId = this.entry ? this.entry.id : -1;
    this.preceptorId = this.entry.preceptorId;

    console.log(this.isEditMode);
    this.isEditMode = this.editEntryId !== -1;
    let preceptorName = this.isEditMode && this.entry ? this.entry.preceptorDisplayName : this.userDisplayName; 

    console.log(preceptorName);
    let dp = new DatePipe(navigator.language); 
    let p = 'y-MM-dd'; // YYYY-MM-DD
    
    let studentDisplay = this.entry ? (this.entry.studentDisplayName) : null;
    let foundStudent = this.students.find((v, i, arr) => v.displayName === studentDisplay);

    this.editTimeEntryForm = new FormGroup({
      'preceptor': new FormControl({value: preceptorName, disabled: true}, [Validators.required]),
      'student': new FormControl({value: foundStudent ? foundStudent.id : null, disabled: this.isEditMode}, [Validators.required]),
      'rotation': new FormControl(this.entry ? this.entry.rotation : null, [Validators.required]),
      'hours': new FormControl(this.entry ? this.entry.hours : null, [Validators.required, Validators.min(1), Validators.max(24)]),
      'date': new FormControl(this.entry ? dp.transform(this.entry.date, p) : dp.transform(new Date(), p), [Validators.required]),
      'notes': new FormControl(this.entry ? this.entry.notes : null),
    });
  }

  getFormData(): TimeEntryDisplay{
    let timeEntry = new TimeEntryDisplay();

    timeEntry.id = this.editEntryId;
    timeEntry.preceptorId = this.preceptorId;
    timeEntry.preceptorDisplayName = this.editTimeEntryForm.get('preceptor').value;
    
    let studentId = +this.editTimeEntryForm.get('student').value;
    let foundStudent = this.students.find((v, i, arr) => v.id === studentId);
    timeEntry.studentDisplayName = foundStudent.displayName;
    timeEntry.studentId = studentId;
    
    timeEntry.rotation = this.editTimeEntryForm.get('rotation').value;
    timeEntry.hours = this.editTimeEntryForm.get('hours').value;
    timeEntry.date = new Date(this.editTimeEntryForm.get('date').value);
    timeEntry.notes = this.editTimeEntryForm.get('notes').value;

    return timeEntry;
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

  onClose(entry: TimeEntryDisplay){
    this.errorMsg = null;
    this.close.emit(entry);
  }
}
