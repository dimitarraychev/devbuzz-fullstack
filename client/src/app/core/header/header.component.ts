import { Component, HostListener } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private userService: UserService) {}

  isMenuOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedInside = this.isClickedInside(event.target as HTMLElement);
    if (!clickedInside) this.hideMenu();
  }

  private isClickedInside(target: HTMLElement): boolean {
    const userContainer = document.querySelector('#user-container');
    return !!userContainer && userContainer.contains(target);
  }

  get isLogged(): boolean {
    return !!this.userService.user;
  }

  get loggedUser() {
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
