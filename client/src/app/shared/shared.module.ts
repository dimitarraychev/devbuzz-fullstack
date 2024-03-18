import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [ButtonComponent, LoaderComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, LoaderComponent],
})
export class SharedModule {}
