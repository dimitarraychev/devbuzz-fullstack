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
    return this.postService.getLatestPosts().subscribe({
      next: (posts) => {
        this.latestPosts = posts;
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

  ngOnDestroy(): void {
    this.latestPostsSubscription.unsubscribe();
    this.hottestPostsSubscription.unsubscribe();
  }
}
