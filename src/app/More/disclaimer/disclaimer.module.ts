import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisclaimerPageRoutingModule } from './disclaimer-routing.module';

import { DisclaimerPage } from './disclaimer.page';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisclaimerPageRoutingModule,
    PipeModule
  ],
  declarations: [DisclaimerPage]
})
export class DisclaimerPageModule {}
