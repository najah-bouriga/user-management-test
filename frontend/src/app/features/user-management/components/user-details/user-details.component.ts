import { Component, Input } from '@angular/core';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  @Input() user!: User; // Use the non-null assertion operator
}
