import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';
import {Role} from '../models/role.model';
import {ApiResponse} from "../utils/ApiResponse";
import {API_URLS} from "../utils/constants";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly apiUrl = API_URLS.USERS;

    constructor(private http: HttpClient) {
    }

    getAllUsers(
        page: number = 1,
        pageSize: number = 10,
        filters: Record<string, any> = {},
        sorts: string[] = []
    ): Observable<ApiResponse<User>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('page_size', pageSize.toString());

        Object.keys(filters).forEach((key) => {
            const value = filters[key];
            if (value !== null && value !== undefined && value !== '') {
                params = params.set(key, value);
            }
        });

        if (sorts.length > 0) {
            params = params.set('ordering', sorts.join(','));
        }

        return this.http.get<ApiResponse<User>>(`${this.apiUrl}/`, {params});
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/${id}/`);
    }

    addUser(user: Partial<User>): Observable<User> {
        const formattedUser = this.formatUserForBackend(user);
        return this.http.post<User>(`${this.apiUrl}/`, formattedUser);
    }

    updateUser(user: Partial<User> & { id: number }): Observable<User> {
        const formattedUser = this.formatUserForBackend(user);
        return this.http.put<User>(`${this.apiUrl}/${user.id}/`, formattedUser);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}/`);
    }

    searchUsers(
        query: string,
        page: number = 1,
        pageSize: number = 10
    ): Observable<ApiResponse<User>> {
        let params = new HttpParams()
            .set('search', query)
            .set('page', page.toString())
            .set('page_size', pageSize.toString());

        return this.http.get<ApiResponse<User>>(`${this.apiUrl}/`, {params});
    }

    private formatUserForBackend(user: Partial<User>): any {
        return {
            user_name: user.user_name || "",
            full_name: user.full_name || "",
            email: user.email || "",
            telephone: user.telephone || "",
            birthday: user.birthday || null,
            role_id: user.role?.id || null,
            password: user.password || ""
        };
    }
}
