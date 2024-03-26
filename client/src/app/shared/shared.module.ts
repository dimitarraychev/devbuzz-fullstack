import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CloseBtnComponent } from './components/close-btn/close-btn.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { TruncateWithElipsisPipe } from './pipes/truncate-with-elipsis.pipe';
import { RouterModule } from '@angular/router';
import { EditBtnComponent } from './components/edit-btn/edit-btn.component';
import { DeleteBtnComponent } from './components/delete-btn/delete-btn.component';

@NgModule({
  declarations: [
    ButtonComponent,
    LoaderComponent,
    RelativeTimePipe,
    TruncateWithElipsisPipe,
    PaginationComponent,
    CloseBtnComponent,
    PostCardComponent,
    EditBtnComponent,
    DeleteBtnComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ButtonComponent,
    LoaderComponent,
    PaginationComponent,
    PostCardComponent,
    CloseBtnComponent,
    EditBtnComponent,
    DeleteBtnComponent,
    RelativeTimePipe,
    TruncateWithElipsisPipe,
  ],
})
export class SharedModule {}
