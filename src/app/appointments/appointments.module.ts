import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppointmentsPageRoutingModule } from './appointments-routing.module';
import { AppointmentsPage } from './appointments.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { PipeModule } from '../Pipes/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    ReactiveFormsModule,
    PipeModule,
    AppointmentsPageRoutingModule
  ],
  declarations: [AppointmentsPage]
})
export class AppointmentsPageModule { }
