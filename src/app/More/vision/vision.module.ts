import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisionPageRoutingModule } from './vision-routing.module';

import { VisionPage } from './vision.page';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisionPageRoutingModule,
    PipeModule
  ],
  declarations: [VisionPage]
})
export class VisionPageModule {}
