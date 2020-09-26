import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointsHistoryPageRoutingModule } from './points-history-routing.module';

import { PointsHistoryPage } from './points-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointsHistoryPageRoutingModule
  ],
  declarations: [PointsHistoryPage]
})
export class PointsHistoryPageModule {}
