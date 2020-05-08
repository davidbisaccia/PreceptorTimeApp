import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  allowReports: boolean = false
  allowAdmin: boolean = false;
  isAuthenticated: boolean = false;

  //TODO: add injection of the auth service...
  constructor() { }

  ngOnInit(): void {
  }

  onLogOut(){
    //TODO:
  }

}
