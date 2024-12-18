import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeasurementsPage } from './measurements.page';

describe('MeasurementsPage', () => {
  let component: MeasurementsPage;
  let fixture: ComponentFixture<MeasurementsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MeasurementsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MeasurementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
