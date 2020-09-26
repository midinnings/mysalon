import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FeaturedDashboardPageRoutingModule } from './featured-dashboard-routing.module';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';
import { FeaturedDashboardPage } from './featured-dashboard.page';
import { StarRatingModule } from 'ionic4-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipeModule,StarRatingModule,
    IonicModule,
    FeaturedDashboardPageRoutingModule
  ],
  declarations: [FeaturedDashboardPage]
})
export class FeaturedDashboardPageModule {}
