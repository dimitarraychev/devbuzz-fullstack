import { Component, EventEmitter, Output } from '@angular/core';
import { PostCategory } from 'src/app/types/post.type';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent {
  @Output() category = new EventEmitter<PostCategory>();

  onCategoryChange(event: Event): void {
    const category = (event.target as HTMLSelectElement).value as PostCategory;
    this.category.emit(category);
  }
}
