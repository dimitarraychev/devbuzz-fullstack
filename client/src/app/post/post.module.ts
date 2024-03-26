import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FeedComponent } from './features/feed/feed.component';
import { PostDetailsComponent } from './features/post-details/post-details.component';
import { PostCreateComponent } from './features/post-create/post-create.component';
import { PostEditComponent } from './features/post-edit/post-edit.component';
import { DetailsCardComponent } from './ui/details-card/details-card.component';
import { CommentComponent } from './ui/comment/comment.component';
import { AddCommentComponent } from './ui/add-comment/add-comment.component';
import { FilterBarComponent } from './ui/filter-bar/filter-bar.component';

@NgModule({
  declarations: [
    FeedComponent,
    PostDetailsComponent,
    PostCreateComponent,
    PostEditComponent,
    DetailsCardComponent,
    CommentComponent,
    AddCommentComponent,
    FilterBarComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, PostRoutingModule],
})
export class PostModule {}
