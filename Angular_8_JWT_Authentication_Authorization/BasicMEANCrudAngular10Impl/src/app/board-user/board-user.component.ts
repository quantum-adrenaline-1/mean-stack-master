import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';

/**
 * This component is specifically for the 'user' role
 */
@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  content: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      successfulResponse => this.content = successfulResponse,
      error => this.content = JSON.parse(error.error).message
    );
  }

}
