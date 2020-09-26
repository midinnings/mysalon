import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingConfirmPage } from './booking-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: BookingConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingConfirmPageRoutingModule {}
