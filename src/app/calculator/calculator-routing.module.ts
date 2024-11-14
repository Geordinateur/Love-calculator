import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatorPage } from './calculator.page';
import { resultIdMatchGuard } from './result-id-match.guard';

const routes: Routes = [
  {
    path: ':id',
    component: CalculatorPage,
    canMatch: [resultIdMatchGuard]
  },
  {
    path: '',
    component: CalculatorPage
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculatorPageRoutingModule {}
