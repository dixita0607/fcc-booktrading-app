import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BooksService {

  constructor(private httpClient: HttpClient) {
  }

  getBooks() {
    return this.httpClient.get('/api/books');
  }

  addBook(bookName: string): Observable<Object> {
    return this.httpClient.post('/api/books', {name: bookName});
  }

  deleteBook(bookId: string): Observable<Object> {
    return this.httpClient.delete(`/api/books/${bookId}`);
  }

}
