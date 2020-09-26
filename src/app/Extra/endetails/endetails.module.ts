import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndetailsPageRoutingModule } from './endetails-routing.module';

import { EndetailsPage } from './endetails.page';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndetailsPageRoutingModule,
    PipeModule
  ],
  declarations: [EndetailsPage]
})
export class EndetailsPageModule {}
