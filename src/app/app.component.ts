import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'fcc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FCC Book Trading App';

  constructor(public authService: AuthService, private router: Router) {
    if (!this.authService.user) this.router.navigate(['home']);
  }
}
