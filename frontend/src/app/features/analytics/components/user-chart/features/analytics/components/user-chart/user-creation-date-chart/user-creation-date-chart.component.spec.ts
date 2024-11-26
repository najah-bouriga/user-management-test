import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreationDateChartComponent } from './user-creation-date-chart.component';

describe('UserCreationDateChartComponent', () => {
  let component: UserCreationDateChartComponent;
  let fixture: ComponentFixture<UserCreationDateChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCreationDateChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCreationDateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
