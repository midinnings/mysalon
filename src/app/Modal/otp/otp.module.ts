import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OtpPage } from './otp.page';
import { NgOtpInputModule } from  'ng-otp-input';
import { BrowserModule } from '@angular/platform-browser';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';
const routes: Routes = [
  {
    path: '',
    component: OtpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowserModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    PipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class OtpPageModule { }
