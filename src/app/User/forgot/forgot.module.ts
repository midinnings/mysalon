import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ForgotPage } from './forgot.page';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';
import { NgOtpInputModule } from 'ng-otp-input';

const routes: Routes = [
  {
    path: '',
    component: ForgotPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PipeModule,
    NgOtpInputModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgotPage]
})
export class ForgotPageModule { }
