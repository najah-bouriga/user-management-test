import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAgePieChartComponent } from './user-age-pie-chart.component';

describe('UserAgePieChartComponent', () => {
  let component: UserAgePieChartComponent;
  let fixture: ComponentFixture<UserAgePieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAgePieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAgePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
