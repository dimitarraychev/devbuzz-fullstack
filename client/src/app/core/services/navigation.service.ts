import { Location } from '@angular/common';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService implements OnDestroy {
  private history: string[] = [];
  private routerSubscripton: Subscription = new Subscription();
  private title: string = 'DevBuzz - Buzzworthy tech gossip';
  private detailsRegex = '/posts/[0-9a-fA-F]{24}';

  constructor(
    private router: Router,
    private location: Location,
    private titleService: Title
  ) {
    this.routerSubscripton = this.subscribeToRouterEvent();
  }

  subscribeToRouterEvent(): Subscription {
    return this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
        this.setTitleFromRoute(event.url);
      }
    });
  }

  private setTitleFromRoute(url: string) {
    if (url === '/home') {
      this.title = 'DevBuzz - Buzzworthy tech gossip';
    } else if (url === '/user/login') {
      this.title = 'DevBuzz - Login';
    } else if (url === '/user/register') {
      this.title = 'DevBuzz - Register';
    } else if (url === '/user/profile') {
      this.title = 'DevBuzz - Profile';
    } else if (url === '/posts/create') {
      this.title = 'DevBuzz - Create';
    } else if (url.includes('edit')) {
      this.title = 'DevBuzz - Edit';
    } else if (url.includes('/posts/feed')) {
      this.title = 'DevBuzz - Feed';
    } else if (url.match(this.detailsRegex)) {
      this.title = 'DevBuzz - Details';
    }

    this.titleService.setTitle(this.title);
  }

  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  ngOnDestroy(): void {
    this.routerSubscripton.unsubscribe();
  }
}
