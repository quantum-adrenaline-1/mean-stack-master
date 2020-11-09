import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';

/**
 * This component is specifically for the 'admin' role
 */
@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  content: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      successfulResponse => this.content = successfulResponse,
      error => this.content = JSON.parse(error.error).message
    );
  }

}
