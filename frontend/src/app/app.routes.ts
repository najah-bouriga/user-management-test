import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'user-management', // Default route is user-management
    pathMatch: 'full', // Match the full path to redirect
  },
  {
    path: 'user-management',
    loadChildren: () =>
      import('./features/user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
  },
  {
    path: 'analytics',
    loadChildren: () =>
      import('./features/analytics/analytics.module').then((m) => m.AnalyticsModule),
  },
  {
    path: '**',
    redirectTo: 'user-management', // Redirect unknown routes to user-management
  },
];
