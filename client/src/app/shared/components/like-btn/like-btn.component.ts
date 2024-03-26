import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-like-btn',
  templateUrl: './like-btn.component.html',
  styleUrls: ['./like-btn.component.scss'],
})
export class LikeBtnComponent {
  @Output() like = new EventEmitter<void>();

  onEdit(): void {
    this.like.emit();
  }
}
