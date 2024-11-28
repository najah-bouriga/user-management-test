import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:8000/api/users'; // Replace with your actual API URL

  constructor(private http: HttpClient) {
  }

  // Fetch all users with optional pagination
  getAllUsers(page: number = 1, pageSize: number = 10, filters: any, sorts: string[]): Observable<{
    results: User[];
    count: number
  }> {
    const params: any = { page, page_size: pageSize, ...filters };
    if (sorts.length > 0) {
      params.ordering = sorts.join(',');
    }

    return this.http.get<{ results: User[]; count: number }>(this.apiUrl, {params});
  }

  // Fetch a single user by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}/`);
  }

  // Create a new user
  addUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Update an existing user
  updateUser(updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${updatedUser.id}/`, updatedUser);
  }

  // Delete a user by ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }

  // Search users based on a query
  searchUsers(query: string): Observable<User[]> {
    const params = new HttpParams().set('search', query);
    return this.http.get<{ results: User[] }>(this.apiUrl, {params}).pipe(
      map(response => response.results)
    );
  }
}
