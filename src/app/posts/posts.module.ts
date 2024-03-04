import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  declarations: [FeedComponent],
  imports: [CommonModule, PostsRoutingModule],
})
export class PostsModule {}
