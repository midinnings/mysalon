import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharingpopPage } from './sharingpop.page';

const routes: Routes = [
  {
    path: '',
    component: SharingpopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharingpopPageRoutingModule {}
