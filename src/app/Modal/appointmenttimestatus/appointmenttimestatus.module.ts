import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmenttimestatusPageRoutingModule } from './appointmenttimestatus-routing.module';

import { AppointmenttimestatusPage } from './appointmenttimestatus.page';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmenttimestatusPageRoutingModule,
    PipeModule
  ],
  declarations: []
})
export class AppointmenttimestatusPageModule {}
