import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';

import { IonicModule } from '@ionic/angular';
import { StarRatingModule } from 'ionic4-star-rating';
import { SalonDetailsPageRoutingModule } from './salon-details-routing.module';

import { SalonDetailsPage } from './salon-details.page';

@NgModule({
  imports: [
    CommonModule,PipeModule,
    FormsModule,StarRatingModule,
    IonicModule,
    SalonDetailsPageRoutingModule
  ],
  declarations: [SalonDetailsPage]
})
export class SalonDetailsPageModule {}
