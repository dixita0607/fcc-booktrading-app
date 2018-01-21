import {Component, OnInit} from '@angular/core';
import {Trade} from "../../models/trade";
import {TradeService} from "../../services/trade.service";
import {AuthService} from "../../services/auth.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'fcc-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {

  pendingTrades: Trade[];
  previousTrades: Trade[];

  constructor(private tradeService: TradeService,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.getTrades();
  }

  getTrades() {
    this.tradeService.getTrades().subscribe(
      (response: Trade[]) => {
        this.pendingTrades = response.filter(trade =>
          trade.requester._id === this.authService.user._id && trade.status === 'pending'
        );
        this.previousTrades = response.filter(trade =>
          trade.requester._id === this.authService.user._id && trade.status !== 'pending'
        );
      },
      error => this.toastService.showToast('Could not fetch trades.')
    )
  }

}
