import { Report } from '../report.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ReportsServiceInterface } from './reports.service.interface';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class ReportsWEbApiService implements ReportsServiceInterface {

  currentReports = new Subject<Report[]>();
  isLoadingReportData = new BehaviorSubject<boolean>(false);

  private controllerPath: string = 'https://localhost:44329/api/reports/';

  constructor(private http: HttpClient) { }


  GetReportsForPreceptor(preceptorId: number, year: number) : Observable<Report[]> {
    const httpPath = this.controllerPath + 'preceptors/' + preceptorId.toString() + '/' + year.toString();
    console.log(httpPath);
    return this.http.get<Report[]>(httpPath).pipe(
        tap(reports => this.currentReports.next(reports))
    );
  }

  GetAllReports(year: number): Observable<Report[]> {
    const httpPath = this.controllerPath + 'all/' + year.toString();
    return this.http.get<Report[]>(httpPath).pipe(
        tap(reports => this.currentReports.next(reports))
    );
  }

  GetAllReportsForStudent(studentId: number, year: number): Observable<Report[]> {
    const httpPath = this.controllerPath + 'learners/' + studentId.toString() + '/' + year.toString();
    return this.http.get<Report[]>(httpPath).pipe(
        tap(reports => this.currentReports.next(reports))
    );
  }

  GetAvailableYears() : Observable<number[]>{
    const httpPath = this.controllerPath + 'years';
    return this.http.get<number[]>(httpPath);
  }
}
