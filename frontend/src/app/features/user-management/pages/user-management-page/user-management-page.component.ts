import { Component, ViewChild } from '@angular/core';
import {ModalComponent} from '../../../../shared/components/modal/modal.component';
import {User} from '../../../../core/models/user.model';
import {UserService} from '../../../../core/services/user.service';
@Component({
  selector: 'app-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.scss'],
})
export class UserManagementPageComponent {
  @ViewChild('modal') modal!: ModalComponent;

  modalTitle: string = '';
  modalType: 'create' | 'edit' | 'details' = 'details';
  selectedUser: User = {} as User;

  openModal(type: 'create' | 'edit' | 'details', user?: User) {
    this.modalType = type;
    this.modalTitle =
      type === 'create' ? 'Create User' :
        type === 'edit' ? 'Edit User' : 'User Details';
    this.selectedUser = user ? { ...user } : ({} as User);

    this.modal.open();
  }

  closeModal() {
    console.log('Modal closed');
  }

  constructor(private userService: UserService) {
  }

  handleSave(user: User) {
    console.log('User to save:', user);
    if (this.modalType === 'create') {
      this.userService.addUser(user).subscribe(() => {
        console.log('User created successfully!');
        this.closeModal();
      });
    } else if (this.modalType === 'edit') {
      this.userService.updateUser(user).subscribe(() => {
        console.log('User updated successfully!');
        this.closeModal();
      });
    }
  }
}
