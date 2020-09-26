import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharingpopPageRoutingModule } from './sharingpop-routing.module';

import { SharingpopPage } from './sharingpop.page';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharingpopPageRoutingModule,
    PipeModule
  ],
  declarations: []
})
export class SharingpopPageModule {}
