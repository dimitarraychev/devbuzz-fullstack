import { Component, OnInit, inject } from '@angular/core';
import { PostService } from '../post-service/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  postService = inject(PostService);
  ngOnInit(): void {
    this.postService.getPosts().subscribe((post) => console.log(post));
  }
}
