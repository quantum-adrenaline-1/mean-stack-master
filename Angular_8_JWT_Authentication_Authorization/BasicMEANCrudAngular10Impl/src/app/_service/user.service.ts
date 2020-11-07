import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* Backend endpoint url for Authentication and Authorization */
const API_URL = 'http://localhost:8080/api/test';

/**
 * This class is used to handle the test endpoints to confirm the user role
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /* Injecting HttpClient as dependency for serving as Http Client Request Tool Operator for Authentication Service */
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(`${API_URL}/all`, { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(`${API_URL}/user`, { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(`${API_URL}/mod`, { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(`${API_URL}/admin`, { responseType: 'text' });
  }
}
