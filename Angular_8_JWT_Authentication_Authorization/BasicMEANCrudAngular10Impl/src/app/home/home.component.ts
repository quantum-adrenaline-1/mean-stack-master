import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';

/**
 * This component class will user UserService to get the public content from backend
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      successfulResponse => {
        this.content = successfulResponse;
      }, error => {
        this.content = JSON.parse(error.error).message;
      }
    );
  }

}
