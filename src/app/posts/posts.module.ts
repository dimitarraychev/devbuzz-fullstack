import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FeedComponent],
  imports: [CommonModule, PostsRoutingModule, SharedModule],
})
export class PostsModule {}
