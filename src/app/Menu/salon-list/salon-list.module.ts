import { PipeModule } from '../../Pipes/pipe/pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EmployerPage } from './salon-list.page';
import { StarRatingModule } from 'ionic4-star-rating';
  
const routes: Routes = [
  {
    path: '',
    component: EmployerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,StarRatingModule,
    PipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmployerPage]
})
export class EmployerPageModule { }
