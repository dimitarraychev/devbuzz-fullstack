import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss'],
})
export class ModalPopupComponent {
  @Input() message: string =
    "Hey, once you confirm there's no turning back! Are you sure?";
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  onConfirm(): void {
    this.confirmed.emit(true);
  }

  onCancel(): void {
    this.confirmed.emit(false);
  }
}
