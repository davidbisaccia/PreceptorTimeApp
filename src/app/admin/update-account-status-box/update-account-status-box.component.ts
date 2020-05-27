import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UserInfo } from 'src/app/shared/userInfo.model';
import { UserDataStorageService } from 'src/app/shared/service/user-data-storage.service';

@Component({
  selector: 'app-update-account-status-box',
  templateUrl: './update-account-status-box.component.html',
  styleUrls: ['./update-account-status-box.component.css']
})
export class UpdateAccountStatusBoxComponent implements OnInit {

  isUpdating: boolean = false;
  @Input() user: UserInfo;
  @Output() close = new EventEmitter<boolean>();
  errorMsg: string = null;

  constructor(private userService: UserDataStorageService) { }

  ngOnInit(): void {
  }

  onUpdateAccountStatus(){
    this.isUpdating = true;

    this.userService.service.changeAccountStatus(this.user.id, !this.user.active).subscribe(
      success => {
        if(success){
          this.close.emit(true);
          this.isUpdating = false;
        }
        else {
          this.errorMsg = 'Account could not be updated.  Please refresh and try again.';
          this.isUpdating = false;
        }
      },
      error => {
        this.errorMsg = error;
        this.isUpdating = false;
      });
  }

  onClose(changedStatus: boolean){
    this.close.emit(changedStatus);
  }

}
