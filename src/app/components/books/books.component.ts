import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../../models/book";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TradeService} from "../../services/trade.service";
import {AuthService} from "../../services/auth.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'fcc-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  myBooks: Book[];
  otherBooks: Book[];
  form: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              public authService: AuthService,
              private booksService: BooksService,
              private tradeService: TradeService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.getBooks();
    this.createForm();
  }

  getBooks() {
    this.loading = true;
    this.booksService.getBooks().subscribe(
      (response: Book[]) => {
        this.otherBooks = response.filter(book => book.owner._id !== this.authService.user._id);
        this.myBooks = response.filter(book => book.owner._id === this.authService.user._id);
        if (this.form.controls['bookName'].value) this.form.controls['bookName'].setValue('');
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    )
  }

  createForm() {
    this.form = this.fb.group({
      bookName: ''
    });
  }

  addBook(bookName: string) {
    this.loading = true;
    this.booksService.addBook(bookName).subscribe(
      response => {
        this.getBooks();
        this.toastService.showToast('Book Added');
      },
      error => {
        this.loading = false;
        this.toastService.showToast('Could not add book.', true);
      }
    )
  }

}
