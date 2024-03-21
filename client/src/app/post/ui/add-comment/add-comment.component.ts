import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent {
  @Input() username: string | undefined = 'Guest';

  @Output() add = new EventEmitter<void>();

  onAdd(): void {
    this.add.emit();
  }
}
