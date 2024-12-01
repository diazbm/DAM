import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IrrigationLogsPage } from './irrigation-logs.page';

describe('IrrigationLogsPage', () => {
  let component: IrrigationLogsPage;
  let fixture: ComponentFixture<IrrigationLogsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IrrigationLogsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(IrrigationLogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
