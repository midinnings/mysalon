import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapmakerPage } from './mapmaker.page';

const routes: Routes = [
  {
    path: '',
    component: MapmakerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapmakerPageRoutingModule {}
