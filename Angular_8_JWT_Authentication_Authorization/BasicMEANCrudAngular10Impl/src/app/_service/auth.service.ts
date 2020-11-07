import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/* Backend endpoint url for Authentication and Authorization */
const AUTH_API = "http://localhost:8080/api/auth";

/* Creating request header for setting 'Content Type' for Authentication service */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /* Injecting HttpClient as dependency for serving as Http Client Request Tool Operator for Authentication Service */
  constructor(private httpClient: HttpClient) { }

  /**
   * This is login service handler function
   * It required user credentials to add in the request body
   * 
   * The response of this function is generic implementation of 'Observable' type 'any'
   * This makes the request and response handling reactive. The application execution will observer/monitor for the response over this route
   * and process it as soon as it is obtained
   * 
   * @param credentials 
   */
  login(credentials): Observable<any> {
    // The request is constructed with url, body (requires username and password for login) and header before dispatch
    return this.httpClient.post(`${AUTH_API}/signin`, {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    // The request is constructed with url, body (requires username, password and email for registration) and header before dispatch
    return this.httpClient.post(`${AUTH_API}/signup`, {
      username: user.username,
      password: user.password,
      email: user.email
    }, httpOptions);
  }
}
