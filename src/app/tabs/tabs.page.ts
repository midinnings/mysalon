
import { CommonService } from './../Service/common.service';
import { ModalController, Events } from '@ionic/angular';
import { UserPipe } from './../Pipes/pipe/user.pipe';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  usertype: any;
  lists: any = {};
  favSalon: boolean = false;
  constructor(public modal: ModalController, public common: CommonService, public events: Events) {
    this.usertype = new UserPipe().transform('UserType');
    var CheckSalon = localStorage.getItem('SalonReffered');
    if (CheckSalon != 'null' && CheckSalon != null && CheckSalon != undefined) {
      this.favSalon = true;
    }
    else {
      this.favSalon = false;
    }

    events.subscribe('ReloadDashboard', (user) => {
      var CheckSalon_1 = localStorage.getItem('SalonReffered');
      if (CheckSalon_1 != 'null' && CheckSalon_1 != null && CheckSalon_1 != undefined) {
        this.favSalon = true;
      }
      else {
        this.favSalon = false;
      }
      console.log('reloading tabs');
    });


  }

}
