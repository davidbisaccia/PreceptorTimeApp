import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { registerData } from '../shared/registerData.model'

export class MyErrorStateMatcher implements MyErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  registerForm: FormGroup;

  constructor(private router: Router) { }

  //name, email, account type, password, token, title

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(6)]),
      'accountType': new FormControl(null, [Validators.required]),
      'title': new FormControl(null, Validators.required),
      'username': new FormControl(null, [Validators.required, Validators.maxLength(32), Validators.minLength(6)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      } ,{validators: this.checkPasswordsMatch });
  }

  onCreateAccount(){
    let data = this.formInputToRegisterData();
    
  }

  handleRegistrationError(error: Error){
    //TODO: Depends on web service return values for errors
  }

  private formInputToRegisterData() : registerData{
    if(!this.registerForm.valid){
      return null;
    }

    let reg = new registerData();
    reg.accountType = this.registerForm.get('accountType').value;
    reg.email = this.registerForm.get('email').value;
    reg.name = this.registerForm.get('name').value;
    reg.password = this.registerForm.get('password').value;
    reg.title = this.registerForm.get('title').value;
    reg.userName = this.registerForm.get('userName').value;
    
    return reg;
  }

  checkPasswordsMatch(group: FormGroup){
    let pass = group.get('password').value;
    let confirm = group.get('confirmPassword').value;

    console.log(pass + ' ' + confirm);
    if(pass === undefined || confirm === undefined) return { notSame: true };

    return pass === confirm ? null : { notSame: true } ;
  }

  navigateToSignIn(){
    this.router.navigate(["auth"]);
  }

}