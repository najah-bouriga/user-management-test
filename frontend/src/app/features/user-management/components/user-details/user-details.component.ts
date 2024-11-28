import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user.model'; // Import User model
import { CommonModule } from '@angular/common'; // Import CommonModule for pipes

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  @Input() user: User | null = null; // Input for user data
  @Output() cancel = new EventEmitter<void>(); // Event emitter for cancel action

  constructor() {}

  ngOnInit(): void {
    if (!this.user) {
      console.error('User data is not available!');
    }
  }

  isFieldAvailable(field: any): boolean {
    return field !== null && field !== undefined && field !== '';
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
