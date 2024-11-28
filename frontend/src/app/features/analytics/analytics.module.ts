import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component';

const routes: Routes = [
  { path: '', component: AnalyticsPageComponent },
];

@NgModule({
  declarations: [AnalyticsPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AnalyticsModule {}
