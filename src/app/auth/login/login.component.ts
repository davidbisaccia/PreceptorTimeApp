import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),//, Validators.maxLength(32), Validators.minLength(6)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onLogIn(){
    //TODO:
  }

  navigateToRegister(){
    this.router.navigate(["register"]);
  }
}
