import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private userService: UserService) {}

  isMenuOpen: boolean = false;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get userInfo() {
    return this.userService.userInfo;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  hideMenu(): void {
    this.isMenuOpen = false;
  }

  logout(): void {
    this.userService.logout();
  }
}
