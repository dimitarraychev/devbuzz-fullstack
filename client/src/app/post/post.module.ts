import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FeedComponent } from './feed/feed.component';
import { PostCardComponent } from './post-card/post-card.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostCommentsComponent } from './post-comments/post-comments.component';

@NgModule({
  declarations: [
    FeedComponent,
    PostCardComponent,
    PostDetailsComponent,
    PostCreateComponent,
    PostEditComponent,
    PostCommentsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, PostRoutingModule],
})
export class PostModule {}
