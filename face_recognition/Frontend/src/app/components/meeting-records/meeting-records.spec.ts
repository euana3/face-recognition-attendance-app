import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRecords } from './meeting-records';

describe('MeetingRecords', () => {
  let component: MeetingRecords;
  let fixture: ComponentFixture<MeetingRecords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingRecords],
    }).compileComponents();

    fixture = TestBed.createComponent(MeetingRecords);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
