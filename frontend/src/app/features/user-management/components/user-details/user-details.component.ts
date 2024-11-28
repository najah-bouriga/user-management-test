import {Component, Inject, Input} from '@angular/core';
import {User} from '../../../../core/models/user.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  constructor(
    private dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
