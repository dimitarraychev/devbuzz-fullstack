import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToDevelopment() {
    this.router.navigate(['/posts', 'feed'], {
      queryParams: { category: 'development' },
    });
  }

  navigateToArtificialIntelligence() {
    this.router.navigate(['/posts', 'feed'], {
      queryParams: { category: 'artificial-intelligence' },
    });
  }

  navigateToBlockchain() {
    this.router.navigate(['/posts', 'feed'], {
      queryParams: { category: 'blockchain' },
    });
  }
}
