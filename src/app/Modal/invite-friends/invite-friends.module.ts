import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PipeModule } from 'src/app/Pipes/pipe/pipe.module';
import { InviteFriendsPageRoutingModule } from './invite-friends-routing.module';

import { InviteFriendsPage } from './invite-friends.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InviteFriendsPageRoutingModule,
    PipeModule
  ],
  declarations: [InviteFriendsPage]
})
export class InviteFriendsPageModule {}
