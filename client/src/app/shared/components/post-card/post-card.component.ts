import { Component, Input } from '@angular/core';
import { Post } from 'src/app/types/post.type';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input({ required: true }) post = {} as Post;
  @Input() moreInfo: 'time' | 'likes' | undefined = undefined;
}
