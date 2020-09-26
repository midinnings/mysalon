import { DashboardPageModule } from './../Menu/dashboard/dashboard.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { JobsPageModule } from '../Menu/history/history.module';
import { ProfilePageModule } from '../Menu/profile/profile.module';
import { PipeModule } from '../Pipes/pipe/pipe.module';
import { CheckoutPageModule } from '../Menu/wallet/wallet.module';
import { EmployerPageModule } from '../Menu/salon-list/salon-list.module';
import { StarRatingModule } from 'ionic4-star-rating';
import {FeaturedDashboardPageModule} from '../Menu/featured-dashboard/featured-dashboard.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    DashboardPageModule,
    StarRatingModule,
    CheckoutPageModule,
    JobsPageModule,FeaturedDashboardPageModule,
    EmployerPageModule,
    ProfilePageModule,
    PipeModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
