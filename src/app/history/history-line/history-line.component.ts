import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { LoveResult } from 'src/app/love.service';

@Component({
  selector: 'app-history-line',
  templateUrl: './history-line.component.html',
  styleUrls: ['./history-line.component.scss'],
})
export class HistoryLineComponent  implements OnInit {

  @Input({ required: true }) loveResult!: LoveResult
  @Output() clickLine = new EventEmitter<LoveResult>();
  @Output() actions = new EventEmitter<LoveResult>();

  constructor() { }

  ngOnInit() {}

}
