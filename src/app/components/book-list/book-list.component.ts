import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../models/book";
import {AuthService} from "../../services/auth.service";
import {TradeService} from "../../services/trade.service";
import {BooksService} from "../../services/books.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'fcc-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  @Input()
  bookList: Book[];

  @Output()
  request: EventEmitter<null> = new EventEmitter<null>();

  @Output()
  delete: EventEmitter<null> = new EventEmitter<null>();

  loading: boolean = false;

  constructor(public authService: AuthService,
              private tradeService: TradeService,
              private booksService: BooksService,
              private toastService: ToastService) {
  }

  ngOnInit() {
  }

  requestTrade(bookId: string) {
    this.loading = true;
    this.tradeService.requestTrade(bookId).subscribe(
      response => {
        this.request.emit();
        this.loading = false;
        this.toastService.showToast('Trade request sent.');
      },
      error => {
        this.loading = false;
        if (error.status === 409) this.toastService.showToast('Already traded.', true);
        else this.toastService.showToast('Could not send trade request.', true);
      }
    )
  }

  deleteBook(bookId: string) {
    this.loading = true;
    this.booksService.deleteBook(bookId).subscribe(
      response => {
        this.delete.emit();
        this.loading = false;
        this.toastService.showToast('Book deleted.');
      },
      error => {
        this.loading = false;
        this.toastService.showToast('Could not delete book.', true);
      }
    )
  }

}
