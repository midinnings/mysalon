import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogdetailPage } from './blogdetail.page';

const routes: Routes = [
  {
    path: '',
    component: BlogdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogdetailPageRoutingModule {}
