import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrefferedSalonPageRoutingModule } from './preffered-salon-routing.module';

import { PrefferedSalonPage } from './preffered-salon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrefferedSalonPageRoutingModule
  ],
  declarations: [PrefferedSalonPage]
})
export class PrefferedSalonPageModule {}
