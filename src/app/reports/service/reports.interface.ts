import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Report } from '../report.model';

export interface ReportsInterface {
    currentReports: Subject<Report[]>;
    isLoadingReportData: BehaviorSubject<boolean>;
    
    GetReportsForPreceptor: (preceptorId: number, year: number) =>  Observable<Report[]>;
    GetAllReports: (year: number) => Observable<Report[]>;
    GetAllReportsForStudent: (studentId: number, year: number) => Observable<Report[]>;
    GetAvailableYears: () => Observable<number[]>;
}