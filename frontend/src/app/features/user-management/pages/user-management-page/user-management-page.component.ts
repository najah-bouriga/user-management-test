import { Component } from '@angular/core';
import {User} from '../../../../core/models/user.model';
import {UserService} from '../../../../core/services/user.service';
import {UserDetailsComponent} from '../../components/user-details/user-details.component';
import {UserFormComponent} from '../../components/user-form/user-form.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss'],
})
export class UserManagementPageComponent {
  constructor(private dialog: MatDialog, private userService: UserService) {
  }
  /*loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.rowData = users;
    });
  }*/
  openModal(action: 'add' | 'edit', user?: User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: {
        action,
        user: action === 'edit' ? user : null
      }
    });

    dialogRef.afterClosed().subscribe((formData: any) => {
      if (formData) {
        if (action === 'add') {
          this.addUser(formData);
        } else if (action === 'edit') {
          this.updateUser(formData);
        }
      }
    });
  }
  viewUser(user: any): void {
    this.dialog.open(UserDetailsComponent, {
      width: '400px',
      data: user,
      position: { top: '50%', left: '50%' },
    });
  }

  addUser(user: any): void {
    this.userService.addUser(user).subscribe(() => {
      // this.loadUsers();
    });
  }

  updateUser(user: any): void {
    this.userService.updateUser(user).subscribe(() => {
      // this.loadUsers();
    });
  }
}
