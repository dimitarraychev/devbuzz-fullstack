import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';
import { interceptorProvider } from './core/interceptors/request.interceptor';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, AuthenticationComponent],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    BrowserModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
