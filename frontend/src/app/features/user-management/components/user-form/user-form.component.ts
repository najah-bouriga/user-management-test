import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Role} from '../../../../core/models/role.model';
import {CommonModule} from '@angular/common';
import {User} from "../../../../core/models/user.model";

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
    ],
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
    @Input() data: any = {action: 'add', user: null};
    @Input() roles: Role[] = [];
    @Output() formSubmit = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<void>();

    userForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.userForm = this.fb.group({
            id: [''],
            full_name: ['', [Validators.required, Validators.minLength(3)]],
            user_name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            telephone: ['', [Validators.required]],
            role: ['', Validators.required], // Role input field
            password: ['', [Validators.required, Validators.minLength(6)]],
            birthday: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        if (this.data.action !== 'add' && this.data.user) {
            this.userForm.patchValue(this.data.user);
            if (this.data.user.role) {
                this.userForm.patchValue({
                    role: this.data.user.role.id,
                });
            }
        }

        if (this.data.action === 'view') {
            this.userForm.disable();
        }
    }

    isInvalid(controlName: string): boolean {
        const control = this.userForm.get(controlName);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    getErrorMessage(controlName: string): string {
        const control = this.userForm.get(controlName);
        if (control?.hasError('required')) {
            return 'This field is required.';
        }
        if (control?.hasError('email')) {
            return 'Invalid email address.';
        }
        if (control?.hasError('minlength')) {
            const minLength = control.errors?.['minlength'].requiredLength;
            return `Minimum ${minLength} characters required.`;
        }
        if (control?.hasError('pattern')) {
            return 'Invalid format.';
        }
        return '';
    }

    onCancel(): void {
        this.cancel.emit();
    }

    onSubmit(): void {
        if (this.userForm.valid) {
            const formData = this.userForm.value;
            const result: User = {
                ...formData,
                role: this.roles.find((r) => {
                    return r.id === parseInt(formData.role);
                }),
            };
            this.formSubmit.emit(result);
        }
    }
}
