import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'fcc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  @ViewChild('books')
  books: ElementRef;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.navigate(['books']);
  }

  ngAfterViewInit() {
    this.books.nativeElement.focus();
  }

}
