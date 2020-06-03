import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDataStorageServiceProvider } from 'src/app/shared/service/user-data-storage.service.provider';
import { UserInfo } from 'src/app/shared/userInfo.model';
import { ReportsServiceProvider } from '../service/reports.service.provider';
import { AuthServiceProvider } from 'src/app/auth/service/auth.service.provider';
import { ReportsServiceInterface } from '../service/reports.service.interface';

@Component({
  selector: 'app-reports-search',
  templateUrl: './reports-search.component.html',
  styleUrls: ['./reports-search.component.css']
})
export class ReportsSearchComponent implements OnInit {

  reportSearchForm: FormGroup;
  years: number[] = [];
  preceptors: UserInfo[] = [];
  errorMsg: string = '';
  isAdmin: boolean = false;
  loggedInPreceptorId: number = -1;
  loggedInStudentId: number = -1; 
  isLoading: boolean = true;
  reportService: ReportsServiceInterface;

  constructor(private userSerivce: UserDataStorageServiceProvider, private r: ReportsServiceProvider, private authService: AuthServiceProvider) { 
  }

  ngOnInit(): void {
    this.reportService = this.r.service;

    this.reportSearchForm = new FormGroup({
      'year' : new FormControl(null, Validators.required),
      'preceptor' : new FormControl(null, Validators.required)
    });

    this.userSerivce.service.getPreceptors().subscribe(
      preceptors => {
        this.preceptors = preceptors;
        this.checkAndUpdateLoading();
      },
      error => {
        this.errorMsg = error;
        this.preceptors = null;
        this.checkAndUpdateLoading();
      }
      );

    this.reportService.GetAvailableYears().subscribe(
      years => {
        this.years = years;
        this.checkAndUpdateLoading();
      }, error => {
        this.errorMsg = error;
        this.years = null;
        this.checkAndUpdateLoading();
      }
    );

    this.authService.service.userSub.subscribe(
      user => {
        if(user === null) return;

        this.isAdmin = user.isAdmin;
        if(user.isPreceptor){
          this.loggedInPreceptorId = +user.id;
        }
        if(user.isLearner){
          this.loggedInStudentId = +user.id;
        }
      },
      error => {
        this.isAdmin = false;
        this.errorMsg = error;
      }
    );
  }

  checkAndUpdateLoading(){
    let hasData = this.preceptors !== null && this.years !== null;
    this.isLoading = !hasData;
  }

  onSearch() {
    let targetYear = +this.reportSearchForm.get('year').value;
    //TODO: Handle the all value
    let targetPreceptor = -1;
    if(this.isAdmin){
      targetPreceptor =  +this.reportSearchForm.get('preceptor').value;
    }
    else if(this.loggedInPreceptorId !== -1){
      targetPreceptor = this.loggedInPreceptorId;
    }

    console.log(targetYear + ' ' + targetPreceptor);
    console.log(this.loggedInStudentId);
    if(this.loggedInStudentId !== -1){
      this.reportService.GetAllReportsForStudent(this.loggedInStudentId, targetYear).subscribe();
    }
    else if (targetPreceptor === 0) { //the all value
      this.reportService.GetAllReports(targetYear).subscribe();
    }
    else {
      this.reportService.GetReportsForPreceptor(targetPreceptor, targetYear).subscribe();
    }
  }

}
