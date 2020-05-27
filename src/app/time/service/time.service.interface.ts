import { TimeEntryDisplay } from '../model/time-entry.model';
import { Observable } from 'rxjs';

export interface TimeServiceInterface {
    getPreceptorTimeEntries: (id: number) => Observable<TimeEntryDisplay[]>;
    
    getLearnerTimeEntries: (id: number) => Observable<TimeEntryDisplay[]>;

    deleteTimeEntry: (id: number) => Observable<boolean>;

    addTimeEntry: (entry: TimeEntryDisplay) => Observable<number>;

    editTimeEntry: (entry: TimeEntryDisplay) => Observable<boolean>;
}