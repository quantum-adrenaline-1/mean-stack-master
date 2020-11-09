import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { TokenStorageService } from '../_service/token-storage.service';

/**
 * The component class for login form invovles fields such as 'username' and 'password'
 * 'onSubmit()' method is used to handle the submit action of form
 * There are flag field like 'isLoggedIn' and 'isLoginFailed' for implementing validations and error UI acknowledgement handling in the template
 * The form object possess the submitted credentials for login
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = { };
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  errorMessage: string = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      successResponse => {
        /* Executing the service functions first to process complete of the response data */
        this.tokenStorageService.saveToken(successResponse.accessToken);
        this.tokenStorageService.saveUser(successResponse);

        /* The field variables are now set to build state of 'login' component as per the response data */
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;

        /* Page is reloaded to update the changes */
        this.pageReload();
      }
    )
  }

  pageReload(): void {
    window.location.reload();
  }

}
