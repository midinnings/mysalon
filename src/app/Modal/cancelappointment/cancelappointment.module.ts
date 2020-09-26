import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelappointmentPageRoutingModule } from './cancelappointment-routing.module';

import { CancelappointmentPage } from './cancelappointment.page';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelappointmentPageRoutingModule,
    PipeModule
  ],
  declarations: []
})
export class CancelappointmentPageModule {}
