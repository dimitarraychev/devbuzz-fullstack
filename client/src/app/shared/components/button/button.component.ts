import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() buttonText: string = '';
  @Input() buttonSize: string = 'default';
  @Input() buttonIcon:
    | 'create'
    | 'more'
    | 'edit'
    | 'login'
    | 'register'
    | undefined = undefined;
  @Input() isDisabled: boolean = false;

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

  getButtonIconSrc(): string {
    switch (this.buttonIcon) {
      case 'create':
        return './assets/images/icon-add.svg';
      case 'more':
        return './assets/images/icon-more.svg';
      case 'edit':
        return './assets/images/icon-edit2.svg';
      case 'login':
        return './assets/images/icon-login.svg';
      case 'register':
        return './assets/images/icon-register.svg';
      default:
        return ''; // or specify a default image source if buttonIcon is undefined
    }
  }
}
