import { PipeModule } from './../../Pipes/pipe/pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlogdetailPageRoutingModule } from './blogdetail-routing.module';

import { BlogdetailPage } from './blogdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    BlogdetailPageRoutingModule
  ],
  declarations: [BlogdetailPage]
})
export class BlogdetailPageModule { }
