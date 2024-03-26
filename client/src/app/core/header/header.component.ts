import { Component } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private userService: UserService) {}

  isMenuOpen: boolean = false;

  get isLogged(): boolean {
    return !!this.userService.user;
  }

  get userInfo() {
    return this.userService.user;
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
