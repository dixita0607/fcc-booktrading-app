import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'fcc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private booksService: BooksService,
              public authService: AuthService) {
  }

  ngOnInit() {
  }

}
