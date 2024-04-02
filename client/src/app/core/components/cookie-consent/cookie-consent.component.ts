import { Component, OnInit } from '@angular/core';
import { cookiePopupState } from 'src/app/shared/animations/element.animation';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
  animations: [cookiePopupState],
})
export class CookieConsentComponent implements OnInit {
  hasAcceptedCookies: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.hasAcceptedCookies = this.userService.hasAcceptedCookies;
  }

  onAccept(): void {
    this.userService.acceptCookies();
    this.hasAcceptedCookies = true;
  }
}
