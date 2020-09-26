import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RefferalPageRoutingModule } from './refferal-routing.module';

import { RefferalPage } from './refferal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RefferalPageRoutingModule
  ],
  declarations: [RefferalPage]
})
export class RefferalPageModule {}
