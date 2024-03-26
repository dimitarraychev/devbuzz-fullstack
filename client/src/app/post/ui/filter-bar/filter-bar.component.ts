import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PostCategory } from 'src/app/types/post.type';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent {
  @Input() selectedCategory: PostCategory = 'all';
  @Output() category = new EventEmitter<PostCategory>();
  @Output() search = new EventEmitter<string>();

  searchInputControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  onSearch(): void {
    const search: string = this.searchInputControl.value;
    if (this.searchInputControl.invalid) return;
    this.search.emit(search);
  }

  onCategoryChange(event: Event): void {
    const category = (event.target as HTMLSelectElement).value as PostCategory;
    this.searchInputControl.reset();
    this.category.emit(category);
  }
}
