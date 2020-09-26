import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordresetPageRoutingModule } from './passwordreset-routing.module';

import { PasswordresetPage } from './passwordreset.page';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordresetPageRoutingModule,
    PipeModule

  ],
  declarations: []
})
export class PasswordresetPageModule {}
