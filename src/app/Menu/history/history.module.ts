import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { JobsPage } from './history.page';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';

const routes: Routes = [
  {
    path: '',
    component: JobsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JobsPage]
})
export class JobsPageModule { }
