import { CommonService } from 'src/app/Service/common.service';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancelappointment',
  templateUrl: './cancelappointment.page.html',
  styleUrls: ['./cancelappointment.page.scss'],
})
export class CancelappointmentPage implements OnInit {

  constructor(public modal: ModalController, public navParams: NavParams) { }
  lists: any = {}
  ngOnInit() {
    this.lists = this.navParams.data;
  }

  close() {
    this.modal.dismiss({ Status: false });
  }

  OpenPopUp() {
    this.modal.dismiss({ Status: true });
  }


}
