import { Injectable } from '@angular/core';
import { Report } from './report.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private fakePreceptorReports: Report[] = [];
  private fakeStudentReports: Report[] = [];
  currentReports = new Subject<Report[]>();

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



  //we could make these not return the observable values, because the component that is firing these is not the component that is 
  //showing them, hence the currentReports subject.  Though maybe the in the future who ever calls this will want to know? So
  //I will leave it that way for now.
  GetReportsForPreceptor(preceptorId: number, year: number) : Observable<Report[]> {
    let fakeObservable = Observable.create(obs => {
      setTimeout(() =>
      {
        let value = this.fakePreceptorReports.slice(0, 3);
        obs.next(value);
        this.currentReports.next(value);
        obs.complete();
      }, 1000);
    });

    return fakeObservable;
  }

  GetAllReports(year: number): Observable<Report[]> {
    let fakeObservable = Observable.create(obs => {
      setTimeout(() =>
      {
        let value = this.fakePreceptorReports.slice();
        obs.next(value);
        this.currentReports.next(value);
        obs.complete();
      }, 1000);
    });

    return fakeObservable;
  }

  GetAllReportsForStudent(studentId: number, year: number): Observable<Report[]> {
    let fakeObservable = Observable.create(obs => {
      setTimeout(() =>
      {
        let value = this.fakeStudentReports.slice();
        obs.next(value);
        this.currentReports.next(value);
        obs.complete();
      }, 1000);
    });

    return fakeObservable;
  }
}
