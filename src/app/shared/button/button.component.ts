import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() buttonText: string = '';
  @Input() buttonSize: string = 'default';

  get buttonStyles(): { [key: string]: string } {
    return {
      'font-size': this.getButtonFontSize(),
    };
  }

  private getButtonFontSize(): string {
    switch (this.buttonSize) {
      case 'small':
        return '14px';
      case 'large':
        return '18px';
      default:
        return '16px';
    }
  }
}
