import { Component, OnInit, Input } from '@angular/core';
import { LoveResult } from 'src/app/love.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent  implements OnInit {

  @Input({ required: true }) loveResult!: LoveResult; 
  @Input({ required: true }) loadingResult!: boolean; 

  constructor() { }

  ngOnInit() {}

}
