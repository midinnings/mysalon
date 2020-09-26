import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapmakerPageRoutingModule } from './mapmaker-routing.module';

import { MapmakerPage } from './mapmaker.page';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MapmakerPageRoutingModule,
    PipeModule
  ],
  declarations: [MapmakerPage]
})
export class MapmakerPageModule { }
