import { MaterialModule } from '../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './wallet-routing.module';

import { CheckoutPage } from './wallet.page';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutPageRoutingModule,
    MaterialModule,
    PipeModule,
  ],
  declarations: [CheckoutPage]
})
export class CheckoutPageModule {}
