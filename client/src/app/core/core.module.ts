import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { CookieConsentComponent } from './cookie-consent/cookie-consent.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, CookieConsentComponent],
  imports: [CommonModule, SharedModule, AppRoutingModule],
  exports: [HeaderComponent, FooterComponent, CookieConsentComponent],
})
export class CoreModule {}
