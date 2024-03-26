import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-like-btn',
  templateUrl: './like-btn.component.html',
  styleUrls: ['./like-btn.component.scss'],
})
export class LikeBtnComponent {
  @Input() isLiked: boolean | null = false;

  @Output() like = new EventEmitter<boolean>();

  iconsMap = {
    like: './assets/images/icon-like.svg',
    liked: './assets/images/icon-liked.svg',
  };

  onLike(): void {
    this.like.emit(true);
  }

  onUnlike(): void {
    this.like.emit(false);
  }
}
