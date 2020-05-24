import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAccountStatusBoxComponent } from './update-account-status-box.component';

describe('UpdateAccountStatusBoxComponent', () => {
  let component: UpdateAccountStatusBoxComponent;
  let fixture: ComponentFixture<UpdateAccountStatusBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAccountStatusBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAccountStatusBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
