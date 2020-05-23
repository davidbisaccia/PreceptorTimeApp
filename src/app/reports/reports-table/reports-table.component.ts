import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportsService } from '../reports.service';
import { Report } from '../report.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.css']
})
export class ReportsTableComponent implements OnInit, OnDestroy {

  private reportSub: Subscription;
  reportData: Report[] = [];
  isLoading: boolean = false;
  allHoursTotal: number = 0;

  constructor(private reportService: ReportsService) { }

  ngOnInit(): void {
    this.reportSub = this.reportService.currentReports.subscribe(data => {
      this.reportData = data;
      this.allHoursTotal = this.reportData.map(x => x.totalHours).reduce((a,b) => a + b);
    }, error => {
      this.reportData = [];
      //TODO: consider logging an error as well
    });
  }

  ngOnDestroy(): void {
    this.reportSub.unsubscribe();
  }

}