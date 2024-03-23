import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  isAuthenticating = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.authenticate().subscribe({
      next: () => (this.isAuthenticating = false),
      error: () => (this.isAuthenticating = false),
      complete: () => (this.isAuthenticating = false),
    });
  }
}
