import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutreceiptPageRoutingModule } from './checkoutreceipt-routing.module';

import { CheckoutreceiptPage } from './checkoutreceipt.page';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';
import { StarRatingModule } from 'ionic4-star-rating';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutreceiptPageRoutingModule,
    PipeModule,
    StarRatingModule
  ],
  declarations: []
})
export class CheckoutreceiptPageModule {}
