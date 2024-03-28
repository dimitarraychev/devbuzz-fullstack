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
import { LikeBtnComponent } from './components/like-btn/like-btn.component';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';

@NgModule({
  declarations: [
    ButtonComponent,
    LoaderComponent,
    PostCardComponent,
    PaginationComponent,
    CloseBtnComponent,
    EditBtnComponent,
    DeleteBtnComponent,
    LikeBtnComponent,
    RelativeTimePipe,
    TruncateWithElipsisPipe,
    ModalPopupComponent,
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
    LikeBtnComponent,
    ModalPopupComponent,
    RelativeTimePipe,
    TruncateWithElipsisPipe,
  ],
})
export class SharedModule {}
