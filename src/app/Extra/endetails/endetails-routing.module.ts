import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndetailsPage } from './endetails.page';

const routes: Routes = [
  {
    path: '',
    component: EndetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndetailsPageRoutingModule {}
