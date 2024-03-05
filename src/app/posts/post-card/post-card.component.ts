import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input() title: string = 'Post Title Post Title';
  @Input() image: string = './assets/images/blockchain.jpg';
}
