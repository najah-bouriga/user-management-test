import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../core/models/user.model';
import {ValidationMessages} from '../../../../core/utils/helpers';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  user: User = {} as User;
  userForm: FormGroup;
  roles = ['Admin', 'User', 'Editor'];

  validationMessages: ValidationMessages = {
    full_name: {
      required: 'Full name is required',
      minlength: 'Full name must be at least 2 characters'
    },
    telephone: {
      required: 'Phone number is required',
      pattern: 'Please enter a valid phone number, e.g.(+19876543210 or +1 987 654 3210)'
    },
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email address, e.g., example@domain.com'
    },
    role: {
      required: 'Role is required'
    }
  };

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<UserFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.action === 'edit' && data.user) {
      this.user = data.user;
    }
    this.userForm = this.fb.group({}); // Initialize the form group
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      full_name: [
        this.user.full_name || '',
        [Validators.required, Validators.minLength(2)]
      ],
      user_name: [
        { value: this.user.user_name || '', disabled: !!this.user.id },
        Validators.required
      ],
      password: [
        { value: this.user.password || '', disabled: !!this.user.id },
        Validators.required
      ],
      birthday: [
        { value: this.user.birthday || '' },
        Validators.required
      ],
      email: [
        { value: this.user.email || '', disabled: !!this.user.id },
        [Validators.required, Validators.email]
      ],
      telephone: [
        this.user.telephone || '',
        [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{10,20}$/)]
      ],
      role: [this.user.role || null, Validators.required]
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
    console.log('fdsfds',this.userForm.value)
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value); // Send valid data back to parent
    } else {
      this.userForm.markAllAsTouched();  // Mark all fields as touched to show validation errors
    }
  }
  test(){
    console.log('fdsfds',this.userForm.value)
    this.dialogRef.close(this.userForm.value); // Send valid data back to parent
  }

  onClose(): void {
    this.dialogRef.close();
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
