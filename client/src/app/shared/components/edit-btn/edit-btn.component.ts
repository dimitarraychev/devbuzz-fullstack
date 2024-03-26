import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-btn',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.scss'],
})
export class EditBtnComponent {
  @Output() edit = new EventEmitter<void>();

  onEdit(): void {
    this.edit.emit();
  }
}
