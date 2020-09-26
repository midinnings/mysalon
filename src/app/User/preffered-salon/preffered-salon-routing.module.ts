import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrefferedSalonPage } from './preffered-salon.page';

const routes: Routes = [
  {
    path: '',
    component: PrefferedSalonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrefferedSalonPageRoutingModule {}
