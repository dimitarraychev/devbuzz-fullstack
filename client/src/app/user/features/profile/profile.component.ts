import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { ApiUser } from 'src/app/types/api.type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  isLoading: boolean = true;
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 1;
  user = {} as ApiUser;
  userId: string = this.route.snapshot.params['id'];

  private userSubscription: Subscription = new Subscription();
  private routeSubscription: Subscription = new Subscription();

  get userInfo() {
    return this.userService.user;
  }

  ngOnInit(): void {
    this.routeSubscription = this.subscribeToRouteChanges();
  }

  subscribeToRouteChanges(): Subscription {
    return this.route.queryParams.subscribe((params) => {
      this.currentPage = Number(params['page']) || 1;

      this.userSubscription = this.getProfile();
    });
  }

  getProfile(): Subscription {
    return this.userService
      .getProfile(this.userId, this.currentPage, this.pageSize)
      .subscribe({
        next: (res) => {
          this.currentPage = res.page;
          this.totalPages = res.totalPages;
          this.user = res.user;
          this.isLoading = false;
        },
        error: (e) => console.log(e), // TODO handle error?,
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;

    const navigationExtras: NavigationExtras = {
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    };
    this.router.navigate([], navigationExtras);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
