import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.scss'],
})
export class DeleteBtnComponent {
  @Output() delete = new EventEmitter<void>();

  onEdit(): void {
    this.delete.emit();
  }
}
