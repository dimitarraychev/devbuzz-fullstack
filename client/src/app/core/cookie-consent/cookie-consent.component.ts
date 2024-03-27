import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
})
export class CookieConsentComponent implements OnInit {
  hasAcceptedCookies: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.subscribeToRouteChanges();
  }

  subscribeToRouteChanges() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.userService.checkIfAcceptedCookies();
      });

    this.userService.hasAcceptedCookies$.subscribe((hasAcceptedCookies) => {
      this.hasAcceptedCookies = hasAcceptedCookies;
    });
  }

  onAccept(): void {
    this.userService.acceptCookies();
    this.hasAcceptedCookies = true;
  }
}
