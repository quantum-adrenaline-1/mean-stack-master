import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_service/token-storage.service';

/**
 * This component is used to get the current user from the database using 'TokenStorageService'
 * and show information like username, token, email and roles
 * In short, this component does the profile management on user login
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
  }

}
