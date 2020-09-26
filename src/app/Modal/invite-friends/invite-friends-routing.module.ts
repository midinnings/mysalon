import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InviteFriendsPage } from './invite-friends.page';

const routes: Routes = [
  {
    path: '',
    component: InviteFriendsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InviteFriendsPageRoutingModule {}
