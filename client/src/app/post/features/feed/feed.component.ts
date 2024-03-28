import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostService } from '../../services/post.service';
import { Post, PostCategory } from 'src/app/types/post.type';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  currentPage: number = 1;
  currentCategory: PostCategory = 'all';
  currentSearch: string = '';
  pageSize: number = 6;
  totalPages: number = 1;
  private routeSubscription: Subscription = new Subscription();

  latestPosts: Post[] = [];
  isLoadingLatest: boolean = true;
  private latestPostsSubscription: Subscription = new Subscription();

  hottestPosts: Post[] = [];
  isLoadingHottest: boolean = true;
  private hottestPostsSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.routeSubscription = this.subscribeToRouteChanges();
  }

  subscribeToRouteChanges(): Subscription {
    return this.route.queryParams.subscribe((params) => {
      this.currentPage = Number(params['page']) || 1;
      this.currentCategory = params['category'] || 'all';
      this.currentSearch = params['search'] || '';

      this.hottestPostsSubscription = this.getHottestPosts();
      this.latestPostsSubscription = this.getLatestPosts();
    });
  }

  getLatestPosts(): Subscription {
    return this.postService
      .getLatestPosts(
        this.currentPage,
        this.pageSize,
        this.currentCategory,
        this.currentSearch
      )
      .subscribe({
        next: (res) => {
          this.currentCategory = res.category;
          this.currentPage = res.page;
          this.totalPages = res.totalPages;
          this.latestPosts = res.posts;
          this.isLoadingLatest = false;
        },
        error: (e) => {
          console.log(e);
          this.isLoadingLatest = false; // TODO handle error?,
        },
      });
  }

  getHottestPosts(): Subscription {
    return this.postService.getHottestPosts(this.currentCategory).subscribe({
      next: (posts) => {
        this.hottestPosts = posts;
        this.isLoadingHottest = false;
      },
      error: (e) => {
        console.log(e);
        this.isLoadingHottest = false; // TODO handle error?,
      },
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

  onCategoryChange(category: PostCategory): void {
    this.currentSearch = '';
    this.currentPage = 1;
    this.currentCategory = category;

    const navigationExtras: NavigationExtras = {
      queryParams: {
        category: this.currentCategory,
        page: this.currentPage,
        search: this.currentSearch,
      },
      queryParamsHandling: 'merge',
    };
    this.router.navigate([], navigationExtras);
  }

  onSearch(search: string | Event) {
    this.currentSearch = '';
    this.currentPage = 1;

    if (typeof search == 'string') this.currentSearch = search;

    const navigationExtras: NavigationExtras = {
      queryParams: { search: this.currentSearch, page: this.currentPage },
      queryParamsHandling: 'merge',
    };
    this.router.navigate([], navigationExtras);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.latestPostsSubscription.unsubscribe();
    this.hottestPostsSubscription.unsubscribe();
  }
}
