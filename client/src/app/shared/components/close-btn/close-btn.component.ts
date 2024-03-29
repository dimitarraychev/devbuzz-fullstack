import { Component } from '@angular/core';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.scss'],
})
export class CloseBtnComponent {
  isDisabled: boolean = false;

  constructor(private navigationService: NavigationService) {}

  navigateBack(): void {
    this.isDisabled = true;
    this.navigationService.back();
  }
}
