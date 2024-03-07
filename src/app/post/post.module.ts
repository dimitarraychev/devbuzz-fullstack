import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostCardComponent } from './post-card/post-card.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostCreateComponent } from './post-create/post-create.component';

@NgModule({
  declarations: [FeedComponent, PostCardComponent, PostDetailsComponent, PostCreateComponent],
  imports: [CommonModule, PostRoutingModule, SharedModule],
})
export class PostModule {}
