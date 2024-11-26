import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // For ng-bootstrap integration

import { AppComponent } from './app.component';

// Import feature and shared modules
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UserManagementModule } from './features/user-management/user-management.module';
import { AnalyticsModule } from './features/analytics/analytics.module';
import {AppRoutes} from './app.routes';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent, // Root application component
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes), // Configure routes
    NgbModule, // ng-bootstrap module
    CoreModule, // Core module
    SharedModule, // Shared module
    UserManagementModule, // Feature module: User Management
    AnalyticsModule, // Feature module: Analytics
  ],
  providers: [], // Add services or global providers here if necessary
  bootstrap: [AppComponent], // Bootstrap the root component
})
export class AppModule {}
