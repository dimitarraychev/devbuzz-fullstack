import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CookieConsentComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, SharedModule, AppRoutingModule],
  exports: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CookieConsentComponent,
    NotFoundComponent,
  ],
})
export class CoreModule {}
