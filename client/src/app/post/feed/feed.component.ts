import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post, PostCategory } from 'src/app/types/post.type';
import { Subscription, map } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

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
  pageSize: number = 6;
  totalPages: number = 0;
  private routeSubscription: Subscription = new Subscription();

  latestPosts: Post[] = [];
  isLoadingLatest: boolean = true;
  private latestPostsSubscription: Subscription = new Subscription();

  hottestPosts: Post[] = [];
  isLoadingHottest: boolean = true;
  private hottestPostsSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      this.currentPage = Number(params['page']) || 1;
      this.currentCategory = params['category'] || 'all';

      this.latestPostsSubscription = this.getLatestPosts();
    });
    this.hottestPostsSubscription = this.getHottestPosts();
  }

  getLatestPosts(): Subscription {
    return this.postService
      .getLatestPosts(this.currentPage, this.pageSize)
      .subscribe({
        next: (res) => {
          this.currentPage = res.currentPage;
          this.totalPages = res.totalPages;
          this.latestPosts = res.posts;
          this.isLoadingLatest = false;
        },
        error: (e) => console.log(e), // TODO handle error?,
      });
  }

  getHottestPosts(): Subscription {
    return this.postService.getHottestPosts().subscribe({
      next: (posts) => {
        this.hottestPosts = posts;
        this.isLoadingHottest = false;
      },
      error: (e) => console.log(e), // TODO handle error?,
    });
  }

  changePage(page: number): void {
    this.currentPage = page;

    const navigationExtras: NavigationExtras = {
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    };
    this.router.navigate([], navigationExtras);
  }

  changeCategory(category: PostCategory): void {
    this.currentCategory = category;

    const navigationExtras: NavigationExtras = {
      queryParams: { category: category },
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
