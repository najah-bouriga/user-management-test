import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component';
import {
  UserAgePieChartComponent
} from './components/user-chart/features/analytics/components/user-chart/user-age-pie-chart/user-age-pie-chart.component';
import {
  UserCreationDateChartComponent
} from './components/user-chart/features/analytics/components/user-chart/user-creation-date-chart/user-creation-date-chart.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsPageComponent,
    children: [
      {
        path: 'user-age-pie-chart',
        component: UserAgePieChartComponent,
      },
      {
        path: 'user-creation-date-chart',
        component: UserCreationDateChartComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
