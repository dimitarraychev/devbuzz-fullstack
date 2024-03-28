import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.scss'],
})
export class CloseBtnComponent {
  constructor(private navigationService: NavigationService) {}

  navigateBack(): void {
    this.navigationService.back();
  }
}
