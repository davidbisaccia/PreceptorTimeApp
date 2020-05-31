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

export class TimeEntryDTO {
    constructor(entry: TimeEntry){
        this.id = entry.id;
        this.preceptorId = entry.id;
        this.studentId = entry.id;
        this.rotation = entry.rotation;
        this.hours = entry.hours;
        this.notes = entry.notes;

        this.date = entry.date.toJSON();
    }

    id: number;
    preceptorId: number;
    studentId: number;
    rotation: string;
    hours: number;
    date: string;
    notes: string;
}