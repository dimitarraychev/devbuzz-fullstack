import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../user/services/user.service';
import { Subscription } from 'rxjs';
import { ApiUser } from '../../../types/api.type';
import {
  slideFromLeftState,
  slowedSlideFromLeftState,
  slowestSlideFromLeftState,
} from 'src/app/shared/animations/element.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    slideFromLeftState,
    slowedSlideFromLeftState,
    slowestSlideFromLeftState,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private userService: UserService) {}

  isLoading: boolean = true;
  users = [] as ApiUser[];
  private topContributorsSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.topContributorsSubscription = this.getTopContributors();
  }

  getTopContributors(): Subscription {
    return this.userService.getTopContributors().subscribe({
      next: (res) => {
        this.users = res;
        this.isLoading = false;
      },
      error: (e) => (this.isLoading = false),
    });
  }

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

  ngOnDestroy(): void {
    this.topContributorsSubscription.unsubscribe();
  }
}
