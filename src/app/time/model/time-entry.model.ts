import { ThrowStmt } from '@angular/compiler';

export class TimeEntry{
    constructor(){}

    id: number;
    preceptorId: number;
    studentId: number;
    rotation: string;
    hours: number;
    date: Date;
    notes: string;
}

export class TimeEntryDisplay extends TimeEntry {
    constructor(){
        super();
    }

    preceptorDisplayName: string;
    studentDisplayName: string;
}

