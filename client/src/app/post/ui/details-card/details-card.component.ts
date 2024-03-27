import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/types/post.type';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss'],
})
export class DetailsCardComponent {
  @Input() post = {} as Post;
  @Input() isLoading: boolean = true;
  @Input() isOwner: boolean = false;
  @Input() likesCount: number | null = 0;
  @Input() isLiked: boolean | null = false;
  @Input() isLikeButtonDisabled: boolean = false;

  @Output() delete = new EventEmitter<void>();
  @Output() like = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<void>();

  constructor() {}

  onDelete(): void {
    this.delete.emit();
  }

  onLike(isLiked: boolean): void {
    this.like.emit(isLiked);
  }
}
