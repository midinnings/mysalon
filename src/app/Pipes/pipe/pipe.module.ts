import { SantizePipe } from './../santize.pipe';
import { RemovelastPipe } from './../removelast.pipe';
import { ArraytostringPipe } from './../arraytostring.pipe';
import { DaysagoPipe } from './../daysago.pipe';
import { StriphtmlPipe } from './../striphtml.pipe';
import { LimittoPipe } from './../limitto.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPipe } from './user.pipe';
import { LanguagePipe } from '../language.pipe';



@NgModule({
  declarations: [UserPipe, LimittoPipe, StriphtmlPipe, DaysagoPipe, ArraytostringPipe, RemovelastPipe, SantizePipe, LanguagePipe],
  imports: [
    CommonModule
  ], exports: [UserPipe, LimittoPipe, StriphtmlPipe, DaysagoPipe, ArraytostringPipe, RemovelastPipe, SantizePipe, LanguagePipe]
})
export class PipeModule { }
