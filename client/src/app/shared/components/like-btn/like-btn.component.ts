import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-like-btn',
  templateUrl: './like-btn.component.html',
  styleUrls: ['./like-btn.component.scss'],
})
export class LikeBtnComponent {
  @Input() isLiked: boolean | null = false;
  @Input() isDisabled: boolean = false;
  @Input() isLogged: boolean = false;

  @Output() like = new EventEmitter<boolean>();

  iconsEnum = {
    like: './assets/images/icon-like.svg',
    liked: './assets/images/icon-liked.svg',
  };

  onToggle(): void {
    if (this.isDisabled) return;

    this.isLiked ? this.like.emit(false) : this.like.emit(true);
  }
}
