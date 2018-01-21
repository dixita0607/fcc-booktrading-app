import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../models/user";

@Injectable()
export class AuthService {

  user: User = null;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('/api/user').subscribe(
      (user: User) => this.user = user,
      (response: HttpErrorResponse) => console.log(response)
    );
  }

}
