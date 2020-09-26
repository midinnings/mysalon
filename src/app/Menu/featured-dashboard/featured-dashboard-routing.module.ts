import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StarRatingModule } from 'ionic4-star-rating';
import { FeaturedDashboardPage } from './featured-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: FeaturedDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturedDashboardPageRoutingModule {}
