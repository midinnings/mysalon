import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RefferalPage } from './refferal.page';

const routes: Routes = [
  {
    path: '',
    component: RefferalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefferalPageRoutingModule {}
