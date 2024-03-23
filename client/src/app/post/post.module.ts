import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FeedComponent } from './feed/feed.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostCardComponent } from './ui/post-card/post-card.component';
import { DetailsCardComponent } from './ui/details-card/details-card.component';
import { CommentComponent } from './ui/comment/comment.component';
import { AddCommentComponent } from './ui/add-comment/add-comment.component';

@NgModule({
  declarations: [
    FeedComponent,
    PostCardComponent,
    PostDetailsComponent,
    PostCreateComponent,
    PostEditComponent,
    DetailsCardComponent,
    CommentComponent,
    AddCommentComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, PostRoutingModule],
})
export class PostModule {}
