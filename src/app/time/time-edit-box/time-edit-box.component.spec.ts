import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEditBoxComponent } from './time-edit-box.component';

describe('TimeEditBoxComponent', () => {
  let component: TimeEditBoxComponent;
  let fixture: ComponentFixture<TimeEditBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEditBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEditBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
