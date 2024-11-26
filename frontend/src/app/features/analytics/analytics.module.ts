import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component';
import {
  UserAgePieChartComponent
} from './components/user-chart/features/analytics/components/user-chart/user-age-pie-chart/user-age-pie-chart.component';
import {
  UserCreationDateChartComponent
} from './components/user-chart/features/analytics/components/user-chart/user-creation-date-chart/user-creation-date-chart.component';

@NgModule({
  declarations: [
    AnalyticsPageComponent,
    UserAgePieChartComponent,
    UserCreationDateChartComponent,
  ],
  imports: [CommonModule, AnalyticsRoutingModule],
})
export class AnalyticsModule {}
