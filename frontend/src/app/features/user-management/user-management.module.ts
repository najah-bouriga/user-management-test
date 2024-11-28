import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import {AgGridAngular} from 'ag-grid-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserManagementPageComponent} from './pages/user-management-page/user-management-page.component';
import {SharedModule} from '../../shared/shared.module';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserFormComponent,
    UserManagementPageComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    AgGridAngular,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatInputModule,
    MatSelectModule,
  ],
})
export class UserManagementModule {}
