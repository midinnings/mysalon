import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PointsHistoryPage } from './points-history.page';

const routes: Routes = [
  {
    path: '',
    component: PointsHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointsHistoryPageRoutingModule {}
