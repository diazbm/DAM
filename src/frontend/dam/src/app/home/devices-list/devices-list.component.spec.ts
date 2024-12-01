import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DevicesListComponent } from './devices-list.component';

describe('DevicesListComponent', () => {
  let component: DevicesListComponent;
  let fixture: ComponentFixture<DevicesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DevicesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DevicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
