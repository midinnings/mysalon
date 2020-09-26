import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalonDetailsPage } from './salon-details.page';

const routes: Routes = [
  {
    path: '',
    component: SalonDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalonDetailsPageRoutingModule {}
