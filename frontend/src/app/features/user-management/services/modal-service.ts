import {Injectable} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {UserFormComponent} from '../components/user-form/user-form.component';
import {UserDetailsComponent} from '../components/user-details/user-details.component';
import {Role} from '../../../core/models/role.model';
import {User} from '../../../core/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    roles: Role[] = [];
    bsModalRef?: BsModalRef;

    constructor(private modalService: BsModalService) {
    }

    openUserFormModal(action: 'add' | 'edit' | 'view', user: User | null,  onFormSubmit: (result: User) => void): void {
        if (action === 'view') {
            this.openUserDetailsModal(user);
        } else {
            this.bsModalRef = this.modalService.show(UserFormComponent, {
                initialState: {
                    data: {action, user},
                    roles: this.roles,
                },
                class: 'modal-lg',
                backdrop: 'static',
                keyboard: false,
            });
          this.bsModalRef.content.formSubmit.subscribe((result: User) => {
            onFormSubmit(result);
          });
            this.bsModalRef.content.cancel.subscribe(() => {
                this.bsModalRef?.hide();
            });
        }
    }

    openUserDetailsModal(user: User | null): void {
        if (user) {
            this.bsModalRef = this.modalService.show(UserDetailsComponent, {
                initialState: {
                    user: user,
                },
                class: 'modal-lg',
                backdrop: 'static',
                keyboard: false,
            });
        }
    }
}
