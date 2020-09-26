import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmenttimestatusPage } from './appointmenttimestatus.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmenttimestatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmenttimestatusPageRoutingModule {}
