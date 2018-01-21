import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {AuthService} from "./services/auth.service";
import {BooksService} from "./services/books.service";
import {TradeService} from "./services/trade.service";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./services/user.service";
import {MenuComponent} from './components/menu/menu.component';
import {BooksComponent} from './components/books/books.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BookListComponent} from './components/book-list/book-list.component';
import {TradesComponent} from './components/trades/trades.component';
import {RequestsComponent} from './components/requests/requests.component';
import {TradeListComponent} from "./components/trade-list/trade-list.component";
import {RequestListComponent} from './components/request-list/request-list.component';
import {ToastComponent} from './components/toast/toast.component';
import {ToastService} from "./services/toast.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    BooksComponent,
    ProfileComponent,
    BookListComponent,
    TradesComponent,
    RequestsComponent,
    TradeListComponent,
    RequestListComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    BooksService,
    TradeService,
    UserService,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
