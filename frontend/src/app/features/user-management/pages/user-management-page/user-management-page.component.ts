import { Component, ViewChild } from '@angular/core';
import {ModalComponent} from '../../../../shared/components/modal/modal.component';
import {User} from '../../../../core/models/user.model';

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

    this.modal.open(); // Ensure the modal reference is working
  }

  closeModal() {
    console.log('Modal closed');
  }

  handleSave(user: User) {
    console.log('User saved:', user);
    this.modal.closeModal(); // Close modal after save
  }
}
