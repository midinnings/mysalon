import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsdetailsPage } from './newsdetails.page';

const routes: Routes = [
  {
    path: '',
    component: NewsdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsdetailsPageRoutingModule {}
