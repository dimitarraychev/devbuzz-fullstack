import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/feed',
  },
  {
    path: 'feed',
    component: FeedComponent,
  },
  {
    path: 'create',
    component: PostCreateComponent,
  },
  {
    path: ':id',
    component: PostDetailsComponent,
  },
  {
    path: ':id/edit',
    component: PostEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
