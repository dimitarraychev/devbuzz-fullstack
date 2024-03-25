import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from 'src/app/types/post.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  constructor(private postService: PostService) {}

  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 0;

  latestPosts: Post[] = [];
  isLoadingLatest: boolean = true;
  private latestPostsSubscription: Subscription = new Subscription();

  hottestPosts: Post[] = [];
  isLoadingHottest: boolean = true;
  private hottestPostsSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.latestPostsSubscription = this.getLatestPosts();
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
    this.getLatestPosts();
  }

  ngOnDestroy(): void {
    this.latestPostsSubscription.unsubscribe();
    this.hottestPostsSubscription.unsubscribe();
  }
}
