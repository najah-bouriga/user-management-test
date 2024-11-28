import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URLS} from "../utils/constants";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) {
  }

  getUserAnalytics(): Observable<any> {
    return this.http.get<any>(API_URLS.ANALYTICS_USERS);
  }
}
