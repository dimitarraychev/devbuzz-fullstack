import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostComment } from 'src/app/types/post.type';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment = {} as PostComment;
  @Input() isOwner: boolean = false;

  @Output() delete = new EventEmitter<void>();

  onDelete(): void {
    this.delete.emit();
  }
}
