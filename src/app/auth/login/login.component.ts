import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  isLoading: boolean = false;
  errorMsg: string = null;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.maxLength(32), Validators.minLength(6)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
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
        //console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/time']);
        //sub.unsubscribe();
      },
      errorMessage => {
        this.errorMsg = errorMessage;
        //this.showErrorAlert(errorMessage);
        this.isLoading = false;
        //sub.unsubscribe();
      });
  }

  navigateToRegister(){
    this.router.navigate(['/auth','register']); 
  }
}
