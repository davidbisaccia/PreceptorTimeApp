import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceProvider } from '../service/auth.service.provider';
import { take, map } from 'rxjs/operators';
import { AuthServiceInterface } from '../service/auth.service.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  isLoading: boolean = false;
  errorMsg: string = null;
  private auth: AuthServiceInterface;

  constructor(private router: Router, private authServ: AuthServiceProvider) { 
  }

  ngOnInit(): void {
    this.auth = this.authServ.service;
    this.signInForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.maxLength(32), Validators.minLength(6)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),

    });

    //if already logged in go to the default time management page.
    this.auth.userSub.pipe(
      take(1),
      map( user => !!user)).subscribe(loggedIn => {
        if(loggedIn){
          this.router.navigate(['/time']);
        }
      });
  }

  onLogIn(){
    //handle the result of signing in or signin up
    const user = this.signInForm.get('username').value;
    const pass = this.signInForm.get('password').value;
    
    this.errorMsg = null;
    this.isLoading = true;
    
    const sub = this.auth.logIn(user, pass).subscribe(
      responseData => {
        this.isLoading = false;
        this.router.navigate(['/time']);
      },
      errorMessage => {
        this.errorMsg = errorMessage;
        this.isLoading = false;
      });
  }

  navigateToRegister(){
    this.router.navigate(['/auth','register']); 
  }
}
