import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Trade} from "../../models/trade";
import {TradeService} from "../../services/trade.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'fcc-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {

  @Input()
  requests: Trade[];

  @Output()
  respond: EventEmitter<null> = new EventEmitter<null>();

  loading: boolean = false;

  constructor(private tradeService: TradeService,
              private toastService: ToastService) {
  }

  ngOnInit() {
  }

  respondTrade(tradeId: string, status: string) {
    this.loading = true;
    this.tradeService.respondTrade(tradeId, status).subscribe(
      response => {
        this.respond.emit();
        this.loading = false;
        this.toastService.showToast('Responded successfully.');
      },
      error => {
        console.log(error);
        this.loading = false;
        this.toastService.showToast('Could not respond to trade.', true);
      }
    )
  }

}
