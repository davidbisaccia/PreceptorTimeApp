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
  constructor(private reportService: ReportsService) { }

  ngOnInit(): void {
    this.reportSub = this.reportService.currentReports.subscribe(data => {
      this.reportData = data;
    }, error => {
      this.reportData = [];
      //TODO: consider logging an error as well
    });
  }

  ngOnDestroy(): void {
    this.reportSub.unsubscribe();
  }

}
