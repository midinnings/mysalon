import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UpdateProfilePageRoutingModule } from './update-profile-routing.module';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { UpdateProfilePage } from './update-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateProfilePageRoutingModule,
    Ionic4DatepickerModule
  ],
  declarations: [UpdateProfilePage]
})
export class UpdateProfilePageModule {}
