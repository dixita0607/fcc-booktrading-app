import {Component, Input, OnInit} from '@angular/core';
import {Trade} from "../../models/trade";

@Component({
  selector: 'fcc-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss']
})
export class TradeListComponent implements OnInit {

  @Input()
  trades: Trade[];

  constructor() {
  }

  ngOnInit() {
  }

}
