import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';

/**
 * This component is specifically for the 'moderator' role
 */
@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit {

  content: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getModeratorBoard().subscribe(
      successfulResponse => this.content = successfulResponse,
      error => this.content = JSON.parse(error.error).message
    );
  }

}
