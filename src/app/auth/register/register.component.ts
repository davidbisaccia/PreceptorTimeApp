import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private router: Router) { }

  //name, email, account type, password, token, title

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(6)]),
      'accountType': new FormControl(null, [Validators.required]),
      'title': new FormControl(null, Validators.required),
      'username': new FormControl(null, [Validators.required, Validators.maxLength(32), Validators.minLength(6)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      } ,{validators: this.checkPasswordsMatch });
  }

  onCreateAccount(){
    //TODO:
    console.log(this.registerForm.value);
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
