import { Injectable } from '@angular/core';
import { Report } from './report.model';
import { RSA_X931_PADDING } from 'constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private fakePreceptorReports: Report[] = [];
  private fakeStudentReports: Report[] = [];

  SetupFakeDataForTestingWithoutBackend(){
    let r1 = new Report('preceptor1', 'student name', 'GI', 33);
    let r2 = new Report('preceptor1', 'student name2', 'Admin', 278);
    let r3 = new Report('preceptor1', 'student name3', 'GI', 22);
    let r4 = new Report('preceptor2', 'student name3', 'Nefro', 11);

    this.fakePreceptorReports.push(r1);
    this.fakePreceptorReports.push(r2);
    this.fakePreceptorReports.push(r3);
    this.fakePreceptorReports.push(r4);

    let r5 = new Report('preceptor1', 'student name', 'Nuero', 26);
    let r6 = new Report('preceptor2', 'student name', 'Rhuem', 412);

    this.fakeStudentReports.push(r5);
    this.fakeStudentReports.push(r6);
  }

  constructor() { 
    this.SetupFakeDataForTestingWithoutBackend();
  }



  GetReportsForPreceptor(preceptorId: number, year: number) : Observable<Report[]> {
    let fakeObservable = Observable.create(obs => {
      setTimeout(() =>
      {
        obs.next(this.fakePreceptorReports.slice(0, 3));
        obs.complete();
      }, 1000);
    });

    return fakeObservable;
  }

  GetAllReports(year: number): Observable<Report[]> {
    let fakeObservable = Observable.create(obs => {
      setTimeout(() =>
      {
        obs.next(this.fakePreceptorReports.slice());
        obs.complete();
      }, 1000);
    });

    return fakeObservable;
  }

  GetAllReportsForStudent(studentId: number, year: number): Observable<Report[]> {
    let fakeObservable = Observable.create(obs => {
      setTimeout(() =>
      {
        obs.next(this.fakeStudentReports.slice());
        obs.complete();
      }, 1000);
    });

    return fakeObservable;
  }
}
