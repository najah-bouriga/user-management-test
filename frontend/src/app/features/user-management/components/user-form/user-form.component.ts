import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../core/models/user.model';
import {ValidationMessages} from '../../../../core/utils/helpers';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user!: User;
  @Output() formSubmit = new EventEmitter<User>();

  userForm!: FormGroup;
  roles = ['Admin', 'User', 'Editor'];

  validationMessages: ValidationMessages = {
    fullName: {
      required: 'Full name is required',
      minlength: 'Full name must be at least 2 characters'
    },
    phone: {
      required: 'Phone number is required',
      pattern: 'Invalid phone number format. Use international format (e.g., +1234567890)'
    },
    role: {
      required: 'Role is required'
    }
  };

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      fullName: [
        this.user.fullName,
        [Validators.required, Validators.minLength(2)]
      ],
      username: [{value: this.user.username, disabled: true}],
      email: [{value: this.user.email, disabled: true}],
      phone: [
        this.user.phone,
        [Validators.required, Validators.pattern(/^\+\d{10,15}$/)]
      ],
      role: [this.user.role, Validators.required]
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.errors && (control.dirty || control.touched)) {
      const firstError = Object.keys(control.errors)[0];
      return this.validationMessages[controlName]?.[firstError] || '';
    }
    return '';
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser = {
        ...this.user,
        ...this.userForm.getRawValue()
      };
      this.formSubmit.emit(updatedUser);
    } else {
      this.markFormGroupTouched(this.userForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
