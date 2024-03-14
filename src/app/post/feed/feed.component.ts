import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from 'src/app/types/post.type';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  constructor(private postService: PostService) {}

  posts: Post[] = [];

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe({
      next: (posts) => (this.posts = posts),
      error: (e) => console.log(e),
    });
  }
}
