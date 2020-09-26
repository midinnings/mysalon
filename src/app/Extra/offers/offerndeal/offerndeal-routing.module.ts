import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferndealPage } from './offerndeal.page';

const routes: Routes = [
  {
    path: '',
    component: OfferndealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferndealPageRoutingModule {}
