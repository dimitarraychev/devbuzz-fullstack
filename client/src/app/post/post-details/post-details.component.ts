import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from 'src/app/types/post.type';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  post = {} as Post;
  postId: string = '';
  isLoading: boolean = true;

  likesCount$ = new BehaviorSubject<number>(0);

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    this.postId = this.activatedRoute.snapshot.params['id'];

    this.postService.getPost$(this.postId).subscribe({
      next: (post) => {
        this.post = post;
        this.likesCount$.next(post.likes.length);
        this.isLoading = false;
      },
      error: (e) => console.log(e), // TODO redirect to 404
    });
  }

  deletePost(): void {
    this.postService.deletePost$(this.postId).subscribe({
      next: console.log,
      error: console.log,
      complete: () => console.log('complete'), // TODO redirect to feed
    });
  }

  likePost(): void {
    this.postService.likePost$(this.postId).subscribe({
      next: (res) => {
        if (res.likes) this.likesCount$.next(res.likes);
      },
      error: console.log,
      complete: () => console.log('complete'),
    });
  }
}
