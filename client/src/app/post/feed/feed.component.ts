import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from 'src/app/types/post.type';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  constructor(private postService: PostService) {}

  latestPosts: Post[] = [];
  hottestPosts: Post[] = [];
  isLoadingLatest: boolean = true;
  isLoadingHottest: boolean = true;

  ngOnInit(): void {
    this.getLatestPosts();
    this.getHottestPosts();
  }

  getLatestPosts(): void {
    this.postService.getLatestPosts().subscribe({
      next: (posts) => {
        this.latestPosts = posts;
        this.isLoadingLatest = false;
      },
      error: (e) => console.log(e), // TODO handle error?,
    });
  }

  getHottestPosts(): void {
    this.postService.getHottestPosts().subscribe({
      next: (posts) => {
        this.hottestPosts = posts;
        this.isLoadingHottest = false;
      },
      error: (e) => console.log(e), // TODO handle error?,
    });
  }
}
