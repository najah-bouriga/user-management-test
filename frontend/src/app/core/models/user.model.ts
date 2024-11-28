import {Role} from './role.model';

export interface User {
    id: number;
    user_name: string;
    full_name: string;
    password: any;
    email: string;
    telephone: string;
    role: Role;
    created_at: Date,
    updated_at: Date,
    birthday: Date;
}
