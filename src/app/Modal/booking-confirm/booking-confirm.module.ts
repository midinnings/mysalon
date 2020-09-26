import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingConfirmPageRoutingModule } from './booking-confirm-routing.module';

import { BookingConfirmPage } from './booking-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingConfirmPageRoutingModule
  ],
  declarations: [BookingConfirmPage]
})
export class BookingConfirmPageModule {}
