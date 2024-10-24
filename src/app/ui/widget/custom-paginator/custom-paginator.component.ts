import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrl: './custom-paginator.component.scss'
})
export class CustomPaginatorComponent {
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [10, 25, 30, 50, 100];
  @Input() length: number = 0;
  @Output() page = new EventEmitter<any>();

  currentPage: number = 0;

  get totalPages(): number {
    return Math.ceil(this.length / this.pageSize);
  }

  changePageSize(event: any): void {
    this.pageSize = +event.target.value;
    this.currentPage = 0;
    this.emitPageEvent();
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.emitPageEvent();
    }
  }

  emitPageEvent(): void {
    this.page.emit({
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
      length: this.length
    });
  }
}
