import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferndealPageRoutingModule } from './offerndeal-routing.module';

import { OfferndealPage } from './offerndeal.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { MaterialModule } from 'src/app/material.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferndealPageRoutingModule,
    NgCalendarModule,
    NgCalendarModule,
    Ionic4DatepickerModule,
    MaterialModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    ReactiveFormsModule,
    NgSelectModule,
    PipeModule,
  ],
  declarations: [OfferndealPage]
})
export class OfferndealPageModule { }
