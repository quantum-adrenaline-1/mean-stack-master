import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_service/auth.service';

/**
 * The component class for registration form invovles fields such as 'username', 'email' and 'password'
 * 'onSubmit()' method is used to handle the submit action of form
 * There are flag field like 'isSuccessful' and 'isSignUpFailed' for implementing validations and error UI acknowledgement handling in the template
 * The form object possess the submitted user profile information for registration 
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // fundamental and most important field of the 'register' component class used to fill in the user details submitted during registration
  form: any = { };
  
  // Two flags below used to monitor and validate the status of registration / 'signup'
  isSuccessful = false;
  isSignUpFailed = false;

  // field of the 'register' component class to fill in error message on error occurance
  errorMessage = '';

  /* Authentication Service injected as dependency for valid registration as per the business logic */
  constructor(private authService: AuthService) { }

  /* Method of the OnInit interface to implement */
  ngOnInit(): void {
  }

  /* Method handling the 'submit' action for 'registration' form in 'register' (this) component */
  onSubmit(): void {
    this.authService.register(this.form)
      .subscribe(
        successResponse => {
        console.log(JSON.stringify(successResponse));
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      }, error => {
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
        this.isSuccessful = false;
      }
    );
  }

}
