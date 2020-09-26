import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReviewPageRoutingModule } from './review-routing.module';
import { StarRatingModule } from 'ionic4-star-rating';
import { ReviewPage } from './review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StarRatingModule,
    IonicModule,
    ReviewPageRoutingModule
  ],
  declarations: [ReviewPage]
})
export class ReviewPageModule {}
