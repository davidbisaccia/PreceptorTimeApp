import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from './auth/service/auth.service.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'PreceptorTimeApp';
  
  constructor(private auth: AuthServiceProvider){}

  ngOnInit(){
    this.auth.service.autoLogin();
  }

  
}
