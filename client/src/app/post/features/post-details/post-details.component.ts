import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Post } from 'src/app/types/post.type';
import { PostService } from '../../services/post.service';
import { UserService } from 'src/app/user/services/user.service';
import { CommentService } from '../../services/comment.service';
import { routeAnimationState } from 'src/app/shared/animations/route.animation';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  animations: [routeAnimationState],
})
export class PostDetailsComponent implements OnInit {
  @HostBinding('@routeAnimationTrigger') routeAnimation = true;

  post = {} as Post;
  isLoading: boolean = true;
  isOwner: boolean = false;
  showPopup: boolean = false;
  commentToDelete: string | undefined = undefined;

  likesCount$ = new BehaviorSubject<number>(0);
  isLiked$ = new BehaviorSubject<boolean>(false);

  postId: string = this.route.snapshot.params['id'];

  constructor(
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get loggedUser() {
    return this.userService.user;
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    this.postService.getPost(this.postId).subscribe({
      next: (post) => {
        this.post = post;
        this.likesCount$.next(post.likes.length);
        this.isLiked$.next(post.likes.some((id) => id == this.loggedUser?._id));
        this.isOwner = post.owner._id == this.loggedUser?._id;
        this.isLoading = false;
      },
      error: (e) => this.router.navigate(['404']),
    });
  }

  onPostLikeToggle(isLike: boolean): void {
    if (isLike) {
      this.onPostLike();
      return;
    }

    this.onPostUnlike();
  }

  onPostLike() {
    this.postService.likePost(this.postId).subscribe({
      next: (post) => {
        this.likesCount$.next(post.likes.length);

        this.isLiked$.next(true);
      },
      error: console.log, // TODO handle error?
    });
  }

  onPostUnlike() {
    this.postService.unlikePost(this.postId).subscribe({
      next: (post) => {
        this.likesCount$.next(post.likes.length);

        this.isLiked$.next(false);
      },
      error: console.log, // TODO handle error?
    });
  }

  onCommentAdd(message: string): void {
    this.commentService
      .addComment({ message, _postId: this.postId })
      .subscribe({
        next: (post) => (this.post.comments = post.comments),
        error: console.log, // TODO handle error?
      });
  }

  onDelete(commentId: string | undefined): void {
    this.showPopup = true;
    if (commentId) this.commentToDelete = commentId;
  }

  onConfirmedDelete(isConfirmed: boolean): void {
    this.showPopup = false;

    if (!isConfirmed) return;

    if (this.commentToDelete == undefined) return this.deletePost();

    return this.deleteComment();
  }

  deletePost(): void {
    this.postService.deletePost(this.postId).subscribe({
      error: console.log, // TODO handle error?
      complete: () => this.router.navigate(['posts/feed']),
    });
  }

  deleteComment(): void {
    if (!this.commentToDelete) return;

    this.commentService.deleteComent(this.commentToDelete).subscribe({
      next: (post) => (this.post.comments = post.comments),
      error: console.log, // TODO handle error?
    });

    this.commentToDelete = undefined;
  }
}
