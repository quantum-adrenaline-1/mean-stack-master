import { Injectable } from '@angular/core';

/**
 * Creating TOKEN_KEY and USER_KEY to manage the token and user information inside the browser session storage
 * This information is stored on user login and cleared on user logout
 */
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

/**
 * Overally, this class in involved in browser session storage for user and token and
 * implements functions like 'getting from, setting into and clearing from session storage' for the user key and token key
 */
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  /**
   * The information stored in Browser Session memory is cleared
   */
  signOut(): void {
    window.sessionStorage.clear();
  }

  /**
   * Saving essentially means updating the token
   * Before, storing the new token key as 'key-value' pair in Session memory, the previous token key is removed
   * Then the new token key is stored inside the session
   * 
   * @param tokenKey 
   */
  public saveToken(tokenKey: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, tokenKey);
  }

  /**
   * This function returns the (string) value of the token key
   */
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  /**
   * Saving essentially means updating the token
   * Before, storing the new user key as 'key-value' pair in Session memory, the previous user key is removed
   * Then the new user key is stored inside the session
   * 
   * @param userKey 
   */
  public saveUser(userKey): void {
    window.sessionStorage.removeItem('USER_KEY');
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(userKey));
  }

  /**
   * 'User' entity is a JSON object which has many attributes in it, so it's type is considered as 'any'
   * The value obtained from the session is properly parsed as JSON before returning from the function
   */
  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

}
