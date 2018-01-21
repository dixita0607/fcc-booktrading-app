import {Component, OnInit} from '@angular/core';
import {TradeService} from "../../services/trade.service";
import {Trade} from "../../models/trade";
import {AuthService} from "../../services/auth.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'fcc-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  pendingRequests: Trade[];
  previousRequests: Trade[];

  constructor(private tradeService: TradeService,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.tradeService.getTrades().subscribe(
      (response: Trade[]) => {
        this.pendingRequests = response.filter(
          trade => trade.book.owner._id === this.authService.user._id && trade.status === 'pending'
        );
        this.previousRequests = response.filter(
          trade => trade.book.owner._id === this.authService.user._id && trade.status !== 'pending'
        )
      },
      error => this.toastService.showToast('Could not fetch Requests.', true);
  )
  }

}
