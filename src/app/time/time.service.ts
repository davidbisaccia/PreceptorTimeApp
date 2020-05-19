import { Injectable } from '@angular/core';
import { TimeEntry } from './model/time-entry.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private fakeTimeEntries: TimeEntry[] = [];


  constructor() {
    const t1 = new TimeEntry();
    t1.id = 1;
    t1.date = new Date();
    t1.hours = 2;
    t1.notes ='notes';
    t1.preceptor = 'dave';
    t1.rotation = 'GI';
    t1.student = 'me';

    const t2 = new TimeEntry();
    t2.id = 2;
    t2.date = new Date();
    t2.hours = 5;
    t2.notes ='notes asdsadas dasd sad asd asd ';
    t2.preceptor = 'Brad';
    t2.rotation = 'Endo';
    t2.student = 'me';

    this.fakeTimeEntries.push(t1);
    this.fakeTimeEntries.push(t2);

    const t3 = new TimeEntry();
    t3.id = 3;
    t3.date = new Date();
    t3.hours = 2;
    t3.notes ='notes';
    t3.preceptor = 'MECEPTOR';
    t3.rotation = 'GI';
    t3.student = 'peeps';

    const t4= new TimeEntry();
    t4.id = 4;
    t4.date = new Date();
    t4.hours = 5;
    t4.notes ='notes asdsadas dasd sad asd asd ';
    t4.preceptor = 'MECEPTOR';
    t4.rotation = 'Endo';
    t4.student = 'other peeps';

    this.fakeTimeEntries.push(t3);
    this.fakeTimeEntries.push(t4);
   }

  getPreceptorTimeEntries(id: number): Observable<TimeEntry[]>{
    let fakeObservable = Observable.create(obs => {
      setTimeout(() => {
        obs.next(this.fakeTimeEntries.slice());
        obs.complete();
      }, 1000);
    });

    return fakeObservable;
  }

  getLearnerTimeEntries(id: number): Observable<TimeEntry[]>{
    let fakeObservable = Observable.create(obs => {
      setTimeout(() => {
        obs.next(this.fakeTimeEntries.slice());
        obs.complete();
      }, 1000);
    });

    return fakeObservable;
  }

  deleteTimeEntry(id: number): Observable<boolean>{
    let fakeObservable = Observable.create(obs => {
      setTimeout(() => {
        let found = this.fakeTimeEntries.find(element => element.id === id);
        if(found !== undefined){
          this.fakeTimeEntries = this.fakeTimeEntries.filter((value, index, arr) => value !== found);
        }

        obs.next(found !== undefined);
        obs.complete(); 
      }, 400);
    });

    return fakeObservable;
  }

  addTimeEntry(entry: TimeEntry): Observable<number>{
    let nextId = this.fakeTimeEntries.length + 1;
    entry.id = nextId;
    this.fakeTimeEntries.push(entry);

    //will return -1 when it fails or throw an error in the future for the real thing
    let fakeObservable = Observable.create(obs => {
      setTimeout(() => {
        obs.next(nextId);
        obs.complete();
      }, 700);
    });

    return fakeObservable;
  }

  editTimeEntry(entry: TimeEntry): Observable<boolean>{
    let fakeObservable = Observable.create(obs => {
      setTimeout(() => {
        let timeIdx = this.fakeTimeEntries.findIndex((value, idx, arr) => value.id === entry.id);
        if(timeIdx === -1) obs.next(false);

        this.fakeTimeEntries[timeIdx] = entry;
        obs.next(true);
        obs.complete();
      }, 700);
    });

    return fakeObservable;
  }
}
