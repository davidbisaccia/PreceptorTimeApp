import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportsServiceProvider } from '../service/reports.service.provider';
import { Report } from '../report.model';
import { Subscription } from 'rxjs';
import { ReportsServiceInterface } from '../service/reports.service.interface';

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.css']
})
export class ReportsTableComponent implements OnInit, OnDestroy {

  private reportSub: Subscription;
  private loadingReportsSub: Subscription;
  reportData: Report[] = [];
  isLoading: boolean = false;
  allHoursTotal: number = 0;
  message: string = 'Please select a report criteria to run.';
  reportService: ReportsServiceInterface;
  
  constructor(private r: ReportsServiceProvider) { 
  }

  ngOnInit(): void {
    this.reportService = this.r.service;

    this.reportSub = this.reportService.currentReports.subscribe(data => {
      this.reportData = data;
      this.allHoursTotal = this.reportData.map(x => x.totalHours).reduce((a,b) => a + b);
    }, error => {
      this.reportData = [];
      this.handleErrorMessage(error);
    });

    this.loadingReportsSub = this.reportService.isLoadingReportData.subscribe(loading => {
      this.isLoading = loading;
    }, error => {
      this.isLoading = false;
      this.handleErrorMessage(error);
    });
  }

  private handleErrorMessage(errorMsg: string){
    this.message = errorMsg;
  }

  ngOnDestroy(): void {
    this.reportSub.unsubscribe();
    this.loadingReportsSub.unsubscribe();
  }

}
