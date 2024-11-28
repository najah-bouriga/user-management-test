import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { ModalService } from '../../services/modal-service';
import { RoleService } from '../../../../core/services/role.service';
import { UserListComponent } from '../../components/user-list/user-list.component';

@Component({
  selector: 'app-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss'],
})
export class UserManagementPageComponent implements OnInit {
  @ViewChild(UserListComponent) userListComponent!: UserListComponent;

  constructor(
      private modalService: ModalService,
      private userService: UserService,
      private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.fetchRoles();
  }

  private fetchRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.modalService.roles = roles;
      },
      error: (error) => {
        console.error('Error fetching roles:', error);
      },
    });
  }

  private handleModalSubmit(
      action: 'add' | 'edit',
      apiCall: (data: User) => any,
      user: User | null = null
  ): void {
    this.modalService.openUserFormModal(action, user, (formData) => {
      apiCall(formData).subscribe({
        next: (response: User) => {
          console.log(`User ${action === 'add' ? 'added' : 'updated'} successfully:`, response);
          this.userListComponent.gridApi.refreshServerSide({
            purge: false,
          });
          this.modalService.bsModalRef?.hide();
        },
        error: (error:any) => {
          console.error(`Error ${action === 'add' ? 'adding' : 'updating'} user:`, error);
        },
      });
    });
  }

  onAddUser(): void {
    this.handleModalSubmit('add', (data) => this.userService.addUser(data));
  }

  onEditUser(user: User): void {
    this.handleModalSubmit('edit', (data) => this.userService.updateUser(data), user);
  }

  onViewUserDetails(user: User): void {
    this.modalService.openUserDetailsModal(user);
  }

  onDeleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.full_name}?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.userListComponent.gridApi.applyTransaction({ remove: [{ id: user.id }] });
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        },
      });
    }
  }
}
