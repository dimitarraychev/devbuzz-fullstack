import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostCreateComponent } from './post-create/post-create.component';

const routes: Routes = [
  {
    path: 'feed',
    component: FeedComponent,
  },
  {
    path: 'post/create',
    component: PostCreateComponent,
  },
  {
    path: 'post/:id',
    component: PostDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
