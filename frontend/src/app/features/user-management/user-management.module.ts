import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserManagementPageComponent } from './pages/user-management-page/user-management-page.component';
import {AgGridAngular} from 'ag-grid-angular';
import {UserListComponent} from './components/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: UserManagementPageComponent },
];

@NgModule({
  declarations: [UserManagementPageComponent, UserListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), AgGridAngular],
})
export class UserManagementModule {}
