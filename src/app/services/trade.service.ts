import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TradeService {

  constructor(private httpClient: HttpClient) {
  }

  getTrades(): Observable<Object> {
    return this.httpClient.get('/api/trades');
  }

  requestTrade(bookId: string): Observable<Object> {
    return this.httpClient.post('/api/trades', {bookId});
  }

  respondTrade(tradeId: string, status: string): Observable<Object> {
    return this.httpClient.put(`/api/trades/${tradeId}`, {status});
  }

}
