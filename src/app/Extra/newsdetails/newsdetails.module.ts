import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsdetailsPageRoutingModule } from './newsdetails-routing.module';

import { NewsdetailsPage } from './newsdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    NewsdetailsPageRoutingModule
  ],
  declarations: [NewsdetailsPage]
})
export class NewsdetailsPageModule { }
