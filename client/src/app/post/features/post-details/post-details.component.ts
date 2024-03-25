import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Post } from 'src/app/types/post.type';
import { PostService } from '../../services/post.service';
import { UserService } from 'src/app/user/services/user.service';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  constructor(
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  post = {} as Post;
  isLoading: boolean = true;
  likesCount$ = new BehaviorSubject<number>(0);

  get userInfo() {
    return this.userService.user;
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const postId = this.activatedRoute.snapshot.params['id'];

    this.postService.getPost(postId).subscribe({
      next: (post) => {
        this.post = post;
        this.likesCount$.next(post.likes.length);
        this.isLoading = false;
      },
      error: (e) => this.router.navigate(['404']),
    });
  }

  onPostDelete(): void {
    this.postService.deletePost(this.post._id).subscribe({
      error: console.log,
      complete: () => this.router.navigate(['posts/feed']),
    });
  }

  onPostLike(): void {
    this.postService.likePost(this.post._id).subscribe({
      next: (res) => {
        if (res.likes) this.likesCount$.next(res.likes);
      },
      error: console.log,
    });
  }

  onPostClose(): void {
    this.router.navigate(['posts/feed']);
  }

  onCommentAdd(message: string): void {
    this.commentService
      .addComment({ message, _postId: this.post._id })
      .subscribe({
        next: (res) => {
          if (res.comments) this.post.comments = res.comments;
        },
        error: console.log,
      });
  }

  onCommentDelete(commentId: string): void {
    this.commentService.deleteComent(commentId).subscribe({
      next: (res) => {
        if (res.comments) this.post.comments = res.comments;
      },
      error: console.log,
    });
  }
}