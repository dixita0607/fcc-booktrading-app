import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {BooksComponent} from "./components/books/books.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {TradesComponent} from "./components/trades/trades.component";
import {RequestsComponent} from "./components/requests/requests.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'books', component: BooksComponent},
  {path: 'trades', component: TradesComponent},
  {path: 'requests', component: RequestsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
