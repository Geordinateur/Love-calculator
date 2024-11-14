import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LoveResult, LoveService } from '../love.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnChanges {

  @Input() id!: string

  title = "Love Calculator"

  placeholder1 = "Batman"
  placeholder2 = "Robin"

  loveResult!: LoveResult
  loadingResult!: boolean

  name1!: string
  name2!: string

  constructor(private service: LoveService) { }

  ngOnChanges() {
    const loveResult = this.service.get(this.id)
    if(!loveResult) return
    this.name1 = loveResult.fname
    this.name2 = loveResult.sname
  }

  onFormSubmit([name1, name2]: [string, string]) {
    this.loadingResult = true;
    this.service.calculate(name1, name2).subscribe({
      next: res => this.loveResult = res
    })
     // Ajouter la recherche dans l'historique
    this.loadingResult = false;
  }

}
