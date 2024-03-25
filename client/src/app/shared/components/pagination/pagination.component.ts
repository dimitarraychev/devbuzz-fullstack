import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input({ required: true }) currentPage: number = 1;
  @Input({ required: true }) totalPages: number = 0;

  @Output() page = new EventEmitter<number>();

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.page.emit(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.page.emit(this.currentPage);
    }
  }
}
