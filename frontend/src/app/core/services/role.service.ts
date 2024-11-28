import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Role} from '../models/role.model';
import {ApiResponse} from '../utils/ApiResponse';
import {API_URLS} from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<ApiResponse<Role>>(API_URLS.ROLES).pipe(
      map((response: ApiResponse<Role>) => response.results)
    );
  }
}
