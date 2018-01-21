import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getUser() {
    return this.httpClient.get('/api/user');
  }

  updateUser(fullName: string, city: string, state: string): Observable<Object> {
    return this.httpClient.put('/api/user', {fullName, city, state});
  }

}
