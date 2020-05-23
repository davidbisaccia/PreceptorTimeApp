import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDataStorageService } from 'src/app/shared/user-data-storage.service';
import { UserInfo } from 'src/app/shared/userInfo.model';
import { ReportsService } from '../reports.service';
import { AuthService } from 'src/app/auth/auth.service';

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

  constructor(private userSerivce: UserDataStorageService, private reportService: ReportsService, private authService: AuthService) { }

  ngOnInit(): void {

    this.reportSearchForm = new FormGroup({
      'year' : new FormControl(null, Validators.required),
      'preceptor' : new FormControl(null, Validators.required)
    });

    this.userSerivce.getPreceptors().subscribe(
      preceptors => {
        this.preceptors = preceptors;
        console.log(this.preceptors);
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
        console.log(this.years);
        this.checkAndUpdateLoading();
      }, error => {
        this.errorMsg = error;
        this.years = null;
        this.checkAndUpdateLoading();
      }
    );

    this.authService.userSub.subscribe(
      user => {
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
    let targetYear = this.reportSearchForm.get('year').value;
    let targetPreceptor = this.loggedInPreceptorId !== -1 ? this.loggedInPreceptorId : +this.reportSearchForm.get('preceptor').value;

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
