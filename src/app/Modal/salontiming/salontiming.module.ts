import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddexpensePageRoutingModule } from './salontiming-routing.module';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddexpensePageRoutingModule,
    PipeModule
  ],
  declarations: []
})
export class AddexpensePageModule {}
