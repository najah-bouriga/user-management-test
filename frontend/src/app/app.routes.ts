import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: '/analytics', pathMatch: 'full'},

  {
    path: 'analytics',
    loadChildren: () =>
      import('./features/analytics/analytics.module').then((m) => m.AnalyticsModule),
  },

  {
    path: 'user-management',
    loadChildren: () =>
      import('./features/user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
  },

  {path: '**', redirectTo: '/analytics'},
];
