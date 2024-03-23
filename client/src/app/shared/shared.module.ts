import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { TruncateWithElipsisPipe } from './pipes/truncate-with-elipsis.pipe';

@NgModule({
  declarations: [
    ButtonComponent,
    LoaderComponent,
    RelativeTimePipe,
    TruncateWithElipsisPipe,
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    LoaderComponent,
    RelativeTimePipe,
    TruncateWithElipsisPipe,
  ],
})
export class SharedModule {}
