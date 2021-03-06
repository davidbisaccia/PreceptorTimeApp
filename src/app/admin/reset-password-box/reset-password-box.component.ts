import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserInfo } from 'src/app/shared/userInfo.model';
import { UserDataStorageServiceProvider } from 'src/app/shared/service/user-data-storage.service.provider';

@Component({
  selector: 'app-reset-password-box',
  templateUrl: './reset-password-box.component.html',
  styleUrls: ['./reset-password-box.component.css']
})
export class ResetPasswordBoxComponent implements OnInit {

  resetUserPasswordForm: FormGroup;
  isUpdating: boolean = false;
  errorMsg: string = null;

  @Input() user: UserInfo;
  @Output() close = new EventEmitter<void>();

  constructor(private userService: UserDataStorageServiceProvider) { }

  ngOnInit(): void {
    this.resetUserPasswordForm = new FormGroup({
      'password' : new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirmPassword' : new FormControl(null, [Validators.required, Validators.minLength(6)]),
    } ,{validators: this.checkPasswordsMatch }
    );
  }

  onReset(){
    let pass = this.resetUserPasswordForm.get('password').value;

    this.isUpdating = true;
    this.userService.service.resetUserPassword(this.user.id, pass).subscribe(
      success => {
        if(success){
          this.close.emit();
          this.isUpdating = false;
        }
        else
        {
          this.errorMsg = 'Failed to update the users password.'
          this.isUpdating = false;
        }
      }, 
      error => {
        this.errorMsg = error;
        this.isUpdating = false;
      });
  }

  onClose(){
    this.close.emit();
  }

  checkPasswordsMatch(group: FormGroup){
    let pass = group.get('password').value;
    let confirm = group.get('confirmPassword').value;

    if(pass === undefined || confirm === undefined) return { notSame: true };

    return pass === confirm ? null : { notSame: true } ;
  }

}
