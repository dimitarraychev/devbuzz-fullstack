import { Component, Input } from '@angular/core';
import { PostComment } from 'src/app/types/post.type';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
})
export class PostCommentsComponent {
  @Input() comments: PostComment[] = [];
  @Input() postId: string = '';

  constructor(private userService: UserService) {}

  get userInfo() {
    return this.userService.userInfo;
  }

  addComment(): void {}
}
