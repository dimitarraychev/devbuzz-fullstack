import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './features/feed/feed.component';
import { PostDetailsComponent } from './features/post-details/post-details.component';
import { PostCreateComponent } from './features/post-create/post-create.component';
import { PostEditComponent } from './features/post-edit/post-edit.component';
import { authGuard } from '../guards/auth.guard';

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
    path: 'feed?:query',
    component: FeedComponent,
  },
  {
    path: 'create',
    component: PostCreateComponent,
    canActivate: [authGuard],
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
