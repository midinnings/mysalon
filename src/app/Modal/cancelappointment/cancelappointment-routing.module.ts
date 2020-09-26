import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelappointmentPage } from './cancelappointment.page';

const routes: Routes = [
  {
    path: '',
    component: CancelappointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelappointmentPageRoutingModule {}
