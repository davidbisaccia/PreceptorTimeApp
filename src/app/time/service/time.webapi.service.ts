import { Injectable } from '@angular/core';
import { TimeEntryDisplay } from '../model/time-entry.model';
import { Observable } from 'rxjs';
import { TimeServiceInterface } from './time.service.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TimeEntryDTO } from './dto/time-entry-dto.model';

@Injectable({
  providedIn: 'root'
})
export class TimeWebApiService implements TimeServiceInterface {
    
    private controllerPath: string = 'https://localhost:44329/api/time/';

    constructor(private http: HttpClient){}

    //TODO: the pipe => map... these do not auto convert to a Date type, they were a string
    //so i did this, but I feel like there should be a better way to do this.
    getPreceptorTimeEntries(id: number): Observable<TimeEntryDisplay[]>{
        const httpPath = this.controllerPath + 'preceptors/' + id.toString();
        return this.http.get<TimeEntryDisplay[]>(httpPath)
        .pipe(
            map(entries => {
                return entries.map(entry => {
                    entry.date = new Date(entry.date.toString());
                    return entry;
                })
            })
        );
    }

    getLearnerTimeEntries(id: number): Observable<TimeEntryDisplay[]>{
        const httpPath = this.controllerPath + 'learners/' + id.toString();
        return this.http.get<TimeEntryDisplay[]>(httpPath)
        .pipe(
            map(entries => {
                return entries.map(entry => {
                    entry.date = new Date(entry.date.toString());
                    return entry;
                })
            })
        );
    }

    deleteTimeEntry(id: number): Observable<boolean>{
        const httpPath = this.controllerPath + id.toString();
        return this.http.delete<boolean>(httpPath);
    }

    addTimeEntry(entry: TimeEntryDisplay): Observable<number>{
        const httpPath = this.controllerPath;
        let dto = new TimeEntryDTO(entry);
        return this.http.put<number>(httpPath, dto);
    }

    editTimeEntry(entry: TimeEntryDisplay): Observable<boolean>{
        const httpPath = this.controllerPath;
        return this.http.post<boolean>(httpPath, entry);
    }
}